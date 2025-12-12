// Passkey utility functions for WebAuthn

// Base64 转 ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// ArrayBuffer 转 Base64
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// 检查浏览器是否支持 WebAuthn
export function isWebAuthnSupported(): boolean {
  return window.PublicKeyCredential !== undefined && navigator.credentials !== undefined;
}

// 检查是否有平台认证器可用
export async function isPlatformAuthenticatorAvailable(): Promise<boolean> {
  if (!isWebAuthnSupported()) return false;
  return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
}

// 开始 Passkey 注册流程
export async function startPasskeyRegistration(options: any) {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn not supported');
  }

  // 确保创建 Discoverable Credential
  const authenticatorSelection = {
    ...(options.publicKey.authenticatorSelection || {}),
    residentKey: "required" as ResidentKeyRequirement,
    requireResidentKey: true,
    userVerification: options.publicKey.authenticatorSelection?.userVerification || "preferred" as UserVerificationRequirement
  };

  const credential = await navigator.credentials.create({
    publicKey: {
      ...options.publicKey,
      challenge: base64ToArrayBuffer(options.publicKey.challenge),
      user: {
        ...options.publicKey.user,
        id: base64ToArrayBuffer(options.publicKey.user.id)
      },
      authenticatorSelection
    }
  }) as PublicKeyCredential;

  if (!credential) {
    throw new Error('Failed to create credential');
  }

  const response = credential.response as AuthenticatorAttestationResponse;
  
  return {
    id: credential.id,
    rawId: arrayBufferToBase64(credential.rawId),
    response: {
      clientDataJSON: arrayBufferToBase64(response.clientDataJSON),
      attestationObject: arrayBufferToBase64(response.attestationObject)
    },
    type: credential.type
  };
}

// 开始 Passkey 登录流程
export async function startPasskeyLogin(options: any) {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn not supported');
  }

  const credential = await navigator.credentials.get({
    publicKey: {
      ...options.publicKey,
      challenge: base64ToArrayBuffer(options.publicKey.challenge),
      allowCredentials: options.publicKey.allowCredentials?.map((cred: any) => ({
        ...cred,
        id: base64ToArrayBuffer(cred.id)
      }))
    }
  }) as PublicKeyCredential;

  if (!credential) {
    throw new Error('Failed to get credential');
  }

  const response = credential.response as AuthenticatorAssertionResponse;
  
  return {
    id: credential.id,
    rawId: arrayBufferToBase64(credential.rawId),
    response: {
      clientDataJSON: arrayBufferToBase64(response.clientDataJSON),
      authenticatorData: arrayBufferToBase64(response.authenticatorData),
      signature: arrayBufferToBase64(response.signature),
      userHandle: response.userHandle ? arrayBufferToBase64(response.userHandle) : null
    },
    type: credential.type
  };
}

