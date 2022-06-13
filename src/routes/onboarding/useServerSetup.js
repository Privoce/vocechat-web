import { useCallback, useState } from "react";

// `name` for in-code usage, `label` for display
const steps = [
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
  const [swiper, setSwiper] = useState(null);

  const [index, setIndex] = useState(0);
  const step = steps[index].name;
  const setStep = useCallback(
    (name) => {
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
