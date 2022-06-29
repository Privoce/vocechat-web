import { useCallback, useState } from "react";
import { Swiper } from "swiper/types";

// `name` for in-code usage, `label` for display
export interface Step {
  name: string;
  label: string;
  canJumpTo?: string[];
}

const steps: Step[] = [
  {
    name: "welcomePage",
    label: "Welcome Page"
  },
  {
    name: "serverName",
    label: "Set Name"
  },
  {
    name: "adminAccount",
    label: "Admin Account"
  },
  {
    name: "whoCanSignUp",
    label: "Who Can Sign Up"
  },
  {
    name: "inviteLink",
    label: "Invites",
    canJumpTo: ["whoCanSignUp"]
  },
  {
    name: "donePage",
    label: "Done",
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
