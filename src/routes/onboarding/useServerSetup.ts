import { useCallback, useState } from "react";
import { Swiper } from "swiper/types";
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

export default function useServerSetup() {
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  const [index, setIndex] = useState<number>(0);
  const step = steps[index].name;
  const setStep = useCallback(
    (name: string) => {
      const newIndex = steps.map((step) => step.name).indexOf(name);
      setIndex(newIndex);
      if (swiper !== null) {
        swiper.slideTo(newIndex);
      }
    },
    [swiper]
  );
  const nextStep = useCallback(() => {
    setIndex((prev) => prev + 1);
    if (swiper !== null) {
      swiper.slideNext(500);
    }
  }, [swiper]);

  const [serverName, setServerName] = useState("");

  return {
    swiper,
    setSwiper,
    step,
    setStep,
    nextStep,
    serverName,
    setServerName
  };
}

export { steps };
