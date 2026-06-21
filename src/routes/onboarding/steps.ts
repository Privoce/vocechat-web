import { t } from "i18next";

// `name` for in-code usage, `label` for display
export interface Step {
  name: string;
  label: string;
  canJumpTo?: string[];
}

export function buildSteps(showTunnelStep: boolean): Step[] {
  const base: Step[] = [
    {
      name: "welcomePage",
      label: t("welcome:onboarding.welcome_page")
    },
    {
      name: "serverName",
      label: t("welcome:onboarding.set_name")
    },
    {
      name: "adminAccount",
      label: t("welcome:onboarding.admin_account")
    },
    {
      name: "whoCanSignUp",
      label: t("welcome:onboarding.who_sign_up")
    },
    {
      name: "inviteLink",
      label: t("welcome:onboarding.invites"),
      canJumpTo: ["whoCanSignUp"]
    },
  ];

  if (showTunnelStep) {
    base.push({
      name: "getPublicDomain",
      label: t("welcome:onboarding.tunnel_get_domain"),
      canJumpTo: ["whoCanSignUp", "inviteLink"]
    });
  }

  base.push({
    name: "donePage",
    label: t("welcome:onboarding.done"),
    canJumpTo: showTunnelStep
      ? ["whoCanSignUp", "inviteLink", "getPublicDomain"]
      : ["whoCanSignUp", "inviteLink"]
  });

  return base;
}

export default buildSteps(false);
