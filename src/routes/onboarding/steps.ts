import { t } from "i18next";

// `name` for in-code usage, `label` for display
export interface Step {
  name: string;
  label: string;
  umamiEvent: string;
  canJumpTo?: string[];
}

export function buildSteps(showTunnelStep: boolean): Step[] {
  const base: Step[] = [
    {
      name: "welcomePage",
      label: t("welcome:onboarding.welcome_page"),
      umamiEvent: "onboarding_step_welcome"
    },
    {
      name: "serverName",
      label: t("welcome:onboarding.set_name"),
      umamiEvent: "onboarding_step_server_name"
    },
    {
      name: "adminAccount",
      label: t("welcome:onboarding.admin_account"),
      umamiEvent: "onboarding_step_admin_account"
    },
    {
      name: "whoCanSignUp",
      label: t("welcome:onboarding.who_sign_up"),
      umamiEvent: "onboarding_step_who_can_sign_up"
    },
  ];

  if (showTunnelStep) {
    base.push({
      name: "getPublicDomain",
      label: t("welcome:onboarding.tunnel_get_domain"),
      umamiEvent: "onboarding_step_get_public_domain",
      canJumpTo: ["whoCanSignUp"]
    });
  }

  base.push({
    name: "donePage",
    label: t("welcome:onboarding.done"),
    umamiEvent: "onboarding_step_done",
    canJumpTo: showTunnelStep
      ? ["whoCanSignUp", "getPublicDomain"]
      : ["whoCanSignUp"]
  });

  return base;
}

export default buildSteps(false);
