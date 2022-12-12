// import { useState } from "react";
import { t } from 'i18next';
// `name` for in-code usage, `label` for display
export interface Step {
  name: string;
  label: string;
  canJumpTo?: string[];
}

const steps: Step[] = [
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
  {
    name: "donePage",
    label: t("welcome:onboarding.done"),
    canJumpTo: ["whoCanSignUp", "inviteLink"]
  }
];


export default steps;
