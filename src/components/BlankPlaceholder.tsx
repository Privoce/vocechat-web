import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import Linkify from "linkify-react";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "@/app/store";
import { KEY_ADMIN_ONLY_INVITE } from "../app/config";
import { BASE_ORIGIN } from "../app/config";
import { compareVersion } from "../utils";
import { useLazyGetPageHtmlQuery, useUploadPageHtmlMutation, useResetPageHtmlMutation, useGeneratePageApiKeyMutation } from "@/app/services/server";
import useServerExtSetting from "../hooks/useServerExtSetting";
import useLicense from "@/hooks/useLicense";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import UsersModal from "./UsersModal";
import EditIcon from "@/assets/icons/edit.svg";
import IconChat from "@/assets/icons/placeholder.chat.svg";
import IconDownload from "@/assets/icons/placeholder.download.svg";
import IconInvite from "@/assets/icons/placeholder.invite.svg";
import IconAsk from "@/assets/icons/placeholder.question.svg";
import CloseIcon from "@/assets/icons/close.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import CheckIcon from "@/assets/icons/check.sign.svg";

const IFRAME_MIN_VERSION = "0.5.21";

type PageType = "landing" | "after_signin";

interface Props {
  type?: "chat" | "user";
}

const legacyClasses = {
  box: "w-[220px] md:w-[200px] h-[100px] md:h-[200px] cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-3xl flex-center flex-col gap-4",
  boxIcon: "w-7 h-7 md:w-10 md:h-10",
  boxTip: "px-5 text-xs md:text-sm text-slate-600 dark:text-gray-100 font-bold text-center",
};

const BlankPlaceholder: FC<Props> = ({ type = "chat" }) => {
  const { t } = useTranslation("welcome");
  const { t: te } = useTranslation("welcome", { keyPrefix: "page_editor" });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { getExtSetting } = useServerExtSetting();
  const onlyAdminCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const server = useAppSelector((store) => store.server, shallowEqual);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);

  const navigate = useNavigate();
  const useIframe = compareVersion(server.version, IFRAME_MIN_VERSION) >= 0;
  const { license: licenseInfo } = useLicense(true);
  const showVoceSpace = useMemo(() => compareVersion(server.version, "0.5.6") >= 0, [server.version]);

  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [createChannelVisible, setCreateChannelVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(false);
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const [previewPage, setPreviewPage] = useState<PageType>("after_signin");
  const [cacheBust, setCacheBust] = useState(0);
  const [htmlPreview, setHtmlPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [fetchPageHtml] = useLazyGetPageHtmlQuery();
  const [uploadPageHtml, { isLoading: uploading }] = useUploadPageHtmlMutation();
  const [resetPageHtml, { isLoading: resetting }] = useResetPageHtmlMutation();
  const [generatePageApiKey] = useGeneratePageApiKeyMutation();

  const canInvite = isAdmin || !onlyAdminCanInvite;
  const chatLabel = type === "chat" ? t("start_by_channel") : t("start_by_dm");
  const chatAction = type === "chat" ? "create_channel" : "start_dm";

  const sendServerInfo = () => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "server_info",
        name: server.name,
        description: server.description || t("desc"),
        canInvite,
        labels: {
          invite: t("invite"),
          channel: chatLabel,
          download: t("download"),
          help: t("help"),
        },
        chatAction,
      },
      "*"
    );
  };

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "iframe_ready" && e.data.page === "signed_in") {
        sendServerInfo();
      }
      if (e.data.type === "action") {
        switch (e.data.action) {
          case "invite":
            setInviteModalVisible(true);
            break;
          case "create_channel":
            setCreateChannelVisible(true);
            break;
          case "start_dm":
            setUserListVisible(true);
            break;
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [server, canInvite, type, t]);

  useEffect(() => {
    sendServerInfo();
  }, [server, canInvite, type]);

  useEffect(() => {
    if (!editorModalVisible) return;
    setHtmlPreview(null);
    fetchPageHtml(previewPage).unwrap().then((html) => {
      setHtmlPreview(html);
    }).catch(() => {
      setHtmlPreview("");
    });
  }, [editorModalVisible, previewPage]);

  const handleDownload = async () => {
    try {
      const html = await fetchPageHtml(previewPage).unwrap();
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = previewPage === "landing" ? "landing.html" : "after-signin.html";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fetch failed, nothing to download
    }
  };

  const handleReset = async () => {
    await resetPageHtml(previewPage);
    setCacheBust(Date.now());
    fetchPageHtml(previewPage).unwrap().then((html) => {
      setHtmlPreview(html);
    }).catch(() => {
      setHtmlPreview("");
    });
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,text/html";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const html = await file.text();
      await uploadPageHtml({ page: previewPage, html });
      setCacheBust(Date.now());
      setHtmlPreview(html);
    };
    input.click();
  };

  const handleCopyPrompt = async () => {
    try {
      const { key } = await generatePageApiKey().unwrap();

      const isAfterSignin = previewPage === "after_signin";
      const curlTarget = isAfterSignin
        ? `${BASE_ORIGIN}/api/page/after_signin`
        : `${BASE_ORIGIN}/api/page/landing`;
      const previewUrl = curlTarget;
      const fileName = isAfterSignin ? "after-signin.html" : "landing.html";

      const pageContext = isAfterSignin
        ? `## 🎯 Target Page: After Sign-In Page
This page is shown to **already logged-in users** as their home screen inside the chat app. It serves as a welcome/dashboard page. Focus on:
- A warm, personalized welcome feel (the user is already authenticated)
- Quick-action shortcuts (start a chat, explore channels, etc.)
- Community highlights or announcements
- Do NOT include login/register CTAs — the user is already signed in`
        : `## 🎯 Target Page: Landing Page (Public)
This page is shown to **visitors who are not yet logged in**. It is the first impression of this chat community. Focus on:
- A compelling hero section that explains the product's value
- Clear call-to-action (sign up / log in)
- Features or social proof section
- A footer with basic links

## 🔗 Auth URLs (Use These Exactly)
- **Login URL**: \`${window.location.origin}/#/login\`
- **Register URL**: \`${window.location.origin}/#/register\`

## 🖼️ iframe-Aware Navigation (Critical)
All login/register buttons **must** use this redirect helper instead of plain \`<a href>\` or \`window.location.href\`:

\`\`\`js
function redirectTo(url) {
  try {
    if (window.self !== window.top) {
      // Page is embedded in an iframe — redirect the parent frame
      window.parent.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch (e) {
    // Cross-origin parent: assume iframe, redirect parent
    window.parent.location.href = url;
  }
}
\`\`\`

Use \`onclick="redirectTo('${window.location.origin}/#/login')"\` for login buttons and \`onclick="redirectTo('${window.location.origin}/#/register')"\` for register buttons.`;

      const prompt = `# Role
You are a front-end development expert and UI/UX designer. Your task is to help design and build a high-performance, modern, single-file HTML page for a self-hosted chat platform called VoceChat.

${pageContext}

---

# 🎨 Design Style Guide (Must Follow)
The existing VoceChat UI uses the following design language. Your generated page **must visually match** this style so it integrates seamlessly:

- **Primary color**: \`#22CCEE\` (cyan/teal). Use for buttons, active states, highlights, and accents.
- **Background**: white (\`#FFFFFF\`) as default page background; light gray (\`#F9FAFB\` / \`#F3F4F6\`) for section or card backgrounds.
- **Text colors**:
  - Headings: \`#111827\` (near-black)
  - Body: \`#374151\` (dark gray)
  - Secondary / muted: \`#6B7280\` (gray-500)
- **Border color**: \`#E5E7EB\` (light) or \`#D1D5DB\` (medium)
- **Border radius**: 12px for cards/containers, 8px for buttons and inputs, 6px for tags/badges
- **Shadows**: Subtle — equivalent to Tailwind \`shadow-md\` (soft, no heavy drop shadows)
- **Typography**: System sans-serif stack; headings use \`font-weight: 600\` (semibold); body uses \`font-weight: 400\`
- **Spacing**: Generous — 32px padding inside cards, 16–24px between sections
- **Overall feel**: Clean, modern, minimal, professional. Avoid dark/neon/overdone gradients.

---

# ⚙️ Deployment API
Deploy the generated HTML to the server with this command:

\`\`\`bash
curl -X PUT ${curlTarget} \\
  -H "X-Page-Api-Key: ${key}" \\
  -H "Content-Type: text/plain" \\
  --data-binary @${fileName}
\`\`\`

**Preview URL** (to verify after deploying): \`${previewUrl}\`

---

# 🔄 Interaction Workflow

### Step 1: Requirements Gathering
Before writing any code:
1. **Inform the user** that the live preview is at: \`${previewUrl}\`
2. **Ask 4–5 targeted questions** about their brand, tone, content, and any specific requirements. Use the language of the user's response for all subsequent interactions. Do not generate code yet.

### Step 2: First Generation & Deployment
Once the user answers:
1. Generate the complete, self-contained HTML.
2. Deploy it to the API endpoint above.

### Step 3: Revisions
- For requested changes: apply them directly and redeploy to the same endpoint.
- For a completely new design or unrelated topic: start from scratch, do not reuse previous code.

---

# 🛠️ Technical Specifications
1. **Single-file self-contained**: All HTML, CSS (use Tailwind CSS via CDN), and JavaScript in one file.
2. **No local dependencies**: Use Unsplash for images, FontAwesome or Lucide CDN for icons.
3. **Responsive**: Works on both Mobile and Desktop.
4. **One-pager by default — no vertical scrolling**: The page must fit within the viewport (\`height: 100vh\`, \`overflow: hidden\`). Do NOT add scroll unless the user explicitly asks for it. Design all content to fit within a single screen.
5. **Complete output**: No truncation or placeholders like \`<!-- remaining code here -->\`.

---

# Next Step
Inform me of the preview URL, then ask your clarifying questions and wait for my answers before writing any code.
`;

      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const iframeSrc = `${BASE_ORIGIN}/api/page/${previewPage}${cacheBust ? `?t=${cacheBust}` : ""}`;
  const htmlLines = (htmlPreview ?? "").split("\n");
  const pageLabel = previewPage === "after_signin" ? te("signed_in_users") : te("not_signed_in_users");

  if (!useIframe) {
    const chatTip = type === "chat" ? t("start_by_channel") : t("start_by_dm");
    const chatHandler = type === "chat" ? () => setCreateChannelVisible(true) : () => setUserListVisible(true);
    const toLicensePage = () => navigate("/setting/license");
    return (
      <>
        <div className="flex flex-col gap-8 -mt-[50px] dark:bg-gray-700">
          <div className="flex flex-col gap-2 items-center group px-4">
            <h2 className="text-center text-3xl text-slate-700 dark:text-white font-bold">
              {t("title", { name: server.name })}
            </h2>
            <p className="text-sm text-gray-400 max-w-md text-center relative whitespace-normal">
              <Linkify
                options={{
                  render: {
                    url: ({ content, attributes: { href: link } }) => (
                      <a className="text-primary-400" target="_blank" href={link} rel="noreferrer">
                        {content}
                      </a>
                    ),
                  },
                }}
              >
                {server.description ? server.description : t("desc")}
              </Linkify>
              {isAdmin && (
                <NavLink to={"/setting/overview"} className="absolute top-0 -right-7 invisible group-hover:visible">
                  <EditIcon />
                </NavLink>
              )}
            </p>
          </div>
          <div style={{ width: "432px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            {(isAdmin || !onlyAdminCanInvite) && (
              <button className={legacyClasses.box} onClick={() => setInviteModalVisible(true)}>
                <IconInvite className={legacyClasses.boxIcon} />
                <div className={legacyClasses.boxTip}>{t("invite")}</div>
              </button>
            )}
            {licenseInfo?.user_limit == 20 && showVoceSpace ? (
              <button onClick={toLicensePage} className={legacyClasses.box}>
                <svg viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="39.5" height="39">
                  <path d="M625.669087 392.461597l-47.150172-6.847535c-6.651891 0-13.499427-6.651891-16.825373-13.499427L538.020634 324.964463c-6.651891-10.173481-13.499427-16.825373-23.672908-16.825372s-16.825373 6.651891-20.151318 13.499426l-23.672908 47.150172c-3.325946 6.651891-10.173481 10.173481-16.825372 13.499427l-47.150172 6.651892c-10.173481 0-16.825373 6.847535-20.151319 16.825372-3.325946 10.173481 0 16.825373 6.651892 23.672908l37.172335 40.498281c3.325946 3.325946 6.651891 10.173481 6.651891 13.499426v3.325946l-10.173481 57.323653c0 10.173481 3.325946 16.825373 10.173481 23.672908 6.651891 6.651891 16.825373 6.651891 26.998854 0l40.49828-23.672908h10.173481c3.325946 0 6.847535 0 10.173481 3.325946l43.824227 23.672908c3.325946 3.325946 6.651891 3.325946 10.173481 3.325946 3.325946 0 10.173481 0 13.499426-3.325946 6.847535-6.651891 10.173481-13.499427 10.173482-23.672908l-10.173482-53.997707v-3.325946c0-6.651891 3.325946-10.173481 6.847536-16.825373l37.172335-40.49828c6.651891-6.651891 6.651891-16.825373 6.651891-23.672908-0.391288-9.977837-10.564769-16.629729-17.21666-16.629729z" fill="#FFDB5D"></path>
                  <path d="M512 0C229.294612 0 0 229.294612 0 512s229.294612 512 512 512 512-229.294612 512-512S794.901032 0 512 0z m-116.212457 798.618265s-33.650745-37.172335-63.975545-63.975544c-43.824226-13.499427-97.821934-23.672908-97.821933-23.672908l67.497134-114.647306c33.650745 47.150172 97.821934 84.322507 155.145587 97.821933l-60.845243 104.473825z m-97.821934-350.59381c0-114.647306 101.147879-222.447077 215.795186-222.447076 114.647306 0 215.795185 101.147879 215.795185 215.795185 0 114.647306-101.147879 215.795185-215.795185 215.795185-114.647306-0.195644-215.795185-94.495988-215.795186-209.143294z m401.069928 279.77073c-30.324799 30.324799-67.497134 70.82308-67.497134 70.82308l-60.649599-104.473825c57.323653-13.499427 114.647306-53.997707 148.298051-97.821933l70.82308 114.647306c0.195644-3.325946-47.150172 3.325946-90.974398 16.825372z" fill="#FFDB5D"></path>
                </svg>
                <div className={legacyClasses.boxTip}>{t("license")}</div>
              </button>
            ) : (
              <button onClick={chatHandler} className={legacyClasses.box}>
                <IconChat className={legacyClasses.boxIcon} />
                <div className={legacyClasses.boxTip}>{chatTip}</div>
              </button>
            )}
            {showVoceSpace ? (
              <NavLink to={"/setting/video"} className={legacyClasses.box}>
                <svg width="39" height="39" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M29.2884 20.4182C29.7499 19.0293 29.9998 17.5438 29.9998 16C29.9998 8.26806 23.7319 2.00008 15.9999 2.00008C8.26798 2.00008 2 8.26806 2 16C2 17.5744 2.25987 19.088 2.73906 20.5005C3.09861 20.5088 3.43836 20.5246 3.74422 20.539C4.1999 20.5603 4.55678 20.5768 4.8465 20.571L4.85764 20.5707L4.9685 18.3288L4.96959 18.3067L4.97155 18.2847L5.09066 16.9465L5.0947 16.9011L5.1024 16.8562L5.23684 16.0725C5.376 15.2613 5.76653 14.5144 6.35326 13.9372C6.851 13.4475 7.44688 13.1183 8.07693 12.9487C7.43026 12.6087 6.98926 11.9304 6.98926 11.1491C6.98926 10.027 7.8989 9.11737 9.021 9.11737C10.1431 9.11737 11.0527 10.027 11.0527 11.1491C11.0527 11.9091 10.6355 12.5717 10.0175 12.9201C10.5584 13.0484 11.0773 13.2921 11.5345 13.6506C11.7371 13.3464 11.9714 13.0622 12.2347 12.8031C13.0209 12.0296 13.9873 11.55 14.9979 11.3626C14.1354 10.9827 13.5332 10.1204 13.5332 9.11741C13.5332 7.76315 14.631 6.6653 15.9853 6.6653C17.3396 6.6653 18.4374 7.76315 18.4374 9.11741C18.4374 10.1214 17.834 10.9845 16.9701 11.3638C17.9716 11.5504 18.9301 12.0227 19.7133 12.7789C19.9844 13.0407 20.2261 13.3293 20.4354 13.6391C20.8836 13.2519 21.3992 12.9818 21.9412 12.8296C21.3295 12.4794 20.9173 11.8204 20.9173 11.065C20.9173 9.94295 21.827 9.0333 22.9491 9.0333C24.0712 9.0333 24.9808 9.94295 24.9808 11.065C24.9808 11.8041 24.5862 12.4511 23.9961 12.8066C24.6416 12.9728 25.2529 13.3056 25.7617 13.8061C26.3485 14.3833 26.739 15.1303 26.8782 15.9415L27.0126 16.7252L27.0206 16.7717L27.0246 16.8187L27.1858 18.6893L27.1866 18.6993L27.1873 18.7094L27.3044 20.4304C27.337 20.4326 27.3723 20.4346 27.4104 20.4364C27.7961 20.4543 28.2307 20.4435 28.7617 20.4304C28.9274 20.4263 29.1025 20.422 29.2884 20.4182ZM28.3028 22.6866C27.9281 22.6925 27.586 22.6933 27.3064 22.6803C26.9334 22.663 26.476 22.6195 26.0838 22.4527C25.8728 22.3629 25.6172 22.2115 25.4138 21.9497C25.2432 21.7301 25.1474 21.4816 25.1142 21.2295L25.1073 21.23L24.9468 18.872L24.7906 17.0585L24.6642 16.3213C24.6046 15.9742 24.4375 15.6545 24.1864 15.4075C23.5405 14.7721 22.4925 14.7669 21.833 15.4036C21.6016 15.6271 21.4381 15.9122 21.3619 16.2213L21.4801 16.916L21.4824 16.93L21.4845 16.9441L21.7168 18.5553L21.7173 18.5587L21.8892 19.7777L21.9002 19.8558V19.9346V21.1257H21.9004C21.9004 21.6008 21.7303 22.0667 21.3626 22.4051C21.0107 22.7289 20.5693 22.8509 20.1747 22.8361C19.3976 22.807 18.5481 22.2065 18.5333 21.1537H18.5331V19.9907V19.9124L18.5439 19.8348L18.7541 18.3355L18.7541 18.3355L18.7553 18.327L18.9865 16.7647L18.9883 16.7527L18.9903 16.7407L19.081 16.2079L19.0664 16.122C18.9549 15.4666 18.6331 14.8586 18.1529 14.3948C16.9386 13.2223 15.0059 13.2279 13.8102 14.4043C13.3861 14.8216 13.0918 15.3511 12.9606 15.9291C12.9724 15.9842 12.9831 16.0396 12.9926 16.0953L13.1246 16.8717L13.1314 16.9113L13.1353 16.9513L13.2876 18.5165L13.4604 19.8436L13.4698 19.9158V19.9886V21.2518H13.4722C13.4722 21.7247 13.3041 22.1899 12.938 22.5288C12.587 22.8538 12.1455 22.9772 11.7497 22.9623C10.968 22.9328 10.1268 22.3267 10.1121 21.2798H10.1047V19.9486V19.8724L10.115 19.7969L10.2831 18.5639L10.2831 18.5638L10.5057 16.9316L10.5083 16.9124L10.5115 16.8934L10.6538 16.0641C10.5653 15.867 10.4393 15.6866 10.2819 15.5347C9.62251 14.898 8.57449 14.9031 7.92862 15.5385C7.67752 15.7855 7.51039 16.1052 7.45084 16.4524L7.32411 17.1911L7.21101 18.4618L7.08736 20.9622V21.2427H7.07764C7.06269 21.5177 6.97921 21.8038 6.79469 22.0616C6.59679 22.3381 6.33952 22.5026 6.11592 22.6007C5.70919 22.7791 5.24297 22.8098 4.89175 22.8169C4.54388 22.8239 4.14601 22.8065 3.75287 22.7882C6.14194 27.0893 10.731 29.9999 15.9999 29.9999C21.3102 29.9999 25.9299 27.0434 28.3028 22.6866ZM15.9853 8.81264C15.817 8.81264 15.6805 8.94909 15.6805 9.11741C15.6805 9.28573 15.817 9.42218 15.9853 9.42218C16.1536 9.42218 16.2901 9.28573 16.2901 9.11741C16.2901 8.94909 16.1536 8.81264 15.9853 8.81264ZM22.9491 10.8096C22.808 10.8096 22.6936 10.924 22.6936 11.065C22.6936 11.2061 22.808 11.3205 22.9491 11.3205C23.0901 11.3205 23.2045 11.2061 23.2045 11.065C23.2045 10.924 23.0901 10.8096 22.9491 10.8096ZM27.3471 21.0237H27.3448L27.3369 20.9082C27.3439 20.9486 27.3471 20.9875 27.3471 21.0237ZM4.84102 21.1507V21.0613C4.83587 21.1 4.83379 21.1247 4.83379 21.1507H4.84102ZM8.76556 11.1491C8.76556 11.008 8.87993 10.8937 9.021 10.8937C9.16208 10.8937 9.27644 11.008 9.27644 11.1491C9.27644 11.2902 9.16208 11.4046 9.021 11.4046C8.87993 11.4046 8.76556 11.2902 8.76556 11.1491Z" fill="url(#paint0_linear_1_116)" />
                  <defs>
                    <linearGradient id="paint0_linear_1_116" x1="7.69527" y1="22.0583" x2="21.1597" y2="11.4392" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#056CF2" />
                      <stop offset="1" stopColor="#4ECCC6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={legacyClasses.boxTip}>{t("vocespace")}</div>
              </NavLink>
            ) : (
              <a href={"https://voce.chat#download"} target={"_blank"} rel="noreferrer" className={legacyClasses.box}>
                <IconDownload className={legacyClasses.boxIcon} />
                <div className={legacyClasses.boxTip}>{t("download")}</div>
              </a>
            )}
            <a href={"https://doc.voce.chat"} target={"_blank"} rel="noreferrer" className={legacyClasses.box}>
              <IconAsk className={legacyClasses.boxIcon} />
              <div className={legacyClasses.boxTip}>{t("help")}</div>
            </a>
          </div>
        </div>
        {createChannelVisible && <ChannelModal personal={true} closeModal={() => setCreateChannelVisible(false)} />}
        {userListVisible && <UsersModal closeModal={() => setUserListVisible(false)} />}
        {inviteModalVisible && <InviteModal closeModal={() => setInviteModalVisible(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="relative w-full h-full self-stretch">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className="w-full h-full border-0"
          title="Welcome Page"
        />
        {isAdmin && (
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => setEditorModalVisible(true)}
              className="opacity-30 hover:opacity-80 transition-opacity p-1 rounded"
              title="Edit page"
            >
              <EditIcon className="w-5 h-5 dark:fill-white" />
            </button>
          </div>
        )}
      </div>

      {editorModalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setEditorModalVisible(false)}
        >
          <div
            className="flex flex-col w-[780px] max-w-[95vw] max-h-[85vh] bg-white dark:bg-gray-900 rounded-lg drop-shadow overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-50">{te("title")}</h2>
              <CloseIcon
                className="cursor-pointer dark:fill-white"
                onClick={() => setEditorModalVisible(false)}
              />
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left sidebar */}
              <div className="w-28 shrink-0 border-r border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 px-1">{te("status_select")}</p>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    previewPage === "after_signin"
                      ? "bg-primary-400 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setPreviewPage("after_signin")}
                >
                  {te("signed_in")}
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    previewPage === "landing"
                      ? "bg-primary-400 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setPreviewPage("landing")}
                >
                  {te("not_signed_in")}
                </button>
              </div>

              {/* Right panel */}
              <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
                {/* Status label */}
                <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                  {te("current_state")}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    【 {pageLabel} 】
                  </span>
                </p>

                {/* Actions row */}
                <div className="flex gap-3 shrink-0">
                  {/* File actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-400 text-white text-sm hover:bg-primary-500 active:bg-primary-500 transition-colors whitespace-nowrap"
                    >
                      <DownloadIcon className="w-4 h-4 shrink-0 fill-white" />
                      {te("download_html")}
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-400 text-white text-sm hover:bg-primary-500 active:bg-primary-500 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 3C4.45507 3 3 4.45507 3 6.25V17.75C3 19.5449 4.45507 21 6.25 21H17.75C19.5449 21 21 19.5449 21 17.75V6.25C21 4.45507 19.5449 3 17.75 3H6.25ZM4.5 6.25C4.5 5.2835 5.2835 4.5 6.25 4.5H17.75C18.7165 4.5 19.5 5.2835 19.5 6.25V17.75C19.5 18.7165 18.7165 19.5 17.75 19.5H6.25C5.2835 19.5 4.5 18.7168 4.5 17.75V6.25Z" />
                        <g transform="translate(12,12) scale(1,-1) translate(-12,-12)">
                          <path d="M16.5303 11.7204L16.4462 11.6478C16.1526 11.4299 15.7359 11.4541 15.4697 11.7204L12.7503 14.4397L12.75 7.75003L12.7432 7.64826C12.6935 7.28218 12.3797 7.00003 12 7.00003L11.8982 7.00688C11.5322 7.05654 11.25 7.37033 11.25 7.75003L11.2503 14.4417L8.52961 11.7198L8.4455 11.6472C8.15193 11.4293 7.73527 11.4534 7.46895 11.7196C7.176 12.0124 7.17591 12.4873 7.46875 12.7803L11.4687 16.7818L11.5529 16.8544C11.8465 17.0724 12.2632 17.0482 12.5295 16.7819L16.5303 12.7811L16.6029 12.6969C16.8208 12.4033 16.7966 11.9867 16.5303 11.7204Z" />
                        </g>
                      </svg>
                      {uploading ? te("uploading") : te("upload_html")}
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={resetting}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-solid border-gray-300 dark:border-gray-500 bg-transparent text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      {resetting ? te("resetting") : te("reset")}
                    </button>
                  </div>

                  {/* AI tip */}
                  <div className="flex-1 border border-dashed border-gray-300 dark:border-gray-400 rounded-lg p-3 flex flex-col justify-between gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {te("ai_tip")}
                    </p>
                    <button
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-400 text-white text-xs hover:bg-primary-500 active:bg-primary-500 transition-colors w-fit"
                    >
                      {copied
                        ? <CheckIcon className="w-3.5 h-3.5 shrink-0 fill-white" />
                        : <CopyIcon className="w-3.5 h-3.5 shrink-0 fill-white" />
                      }
                      {copied ? te("copied") : te("copy_prompt")}
                    </button>
                  </div>
                </div>

                {/* HTML preview */}
                <div className="flex flex-col gap-1.5 overflow-hidden flex-1 min-h-0">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-50 shrink-0">
                    【 {te("html_preview")} 】
                  </p>
                  <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    {htmlPreview === null ? (
                      <div className="p-4 text-xs text-gray-400">{te("loading")}</div>
                    ) : htmlLines.map((line, i) => (
                      <div key={i} className="flex hover:bg-gray-200 dark:hover:bg-gray-700">
                        <span className="w-9 shrink-0 text-right pr-2.5 py-0.5 text-gray-400 dark:text-gray-500 select-none border-r border-gray-200 dark:border-gray-700 text-xs font-mono leading-5">
                          {i + 1}
                        </span>
                        <span className="pl-3 py-0.5 text-gray-700 dark:text-gray-300 whitespace-pre text-xs font-mono leading-5">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {createChannelVisible && (
        <ChannelModal personal={true} closeModal={() => setCreateChannelVisible(false)} />
      )}
      {userListVisible && <UsersModal closeModal={() => setUserListVisible(false)} />}
      {inviteModalVisible && <InviteModal closeModal={() => setInviteModalVisible(false)} />}
    </>
  );
};

export default BlankPlaceholder;
