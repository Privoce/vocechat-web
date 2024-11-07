// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";
import { useAppSelector } from "../../../app/store";
import { shallowEqual, useDispatch } from "react-redux";
import { updateMsgSoundSetting } from "@/app/slices/ui";
import Toggle from "@/components/styled/Toggle";

// type Props = {}

const Index = () => {
  const dispatch = useDispatch();
  const playSound = useAppSelector((store) => !!store.ui.msgSound, shallowEqual);
  const { t } = useTranslation("setting", { keyPrefix: "overview.message_sound" });
  //   const { t: ct } = useTranslation();
  const toggleEnable = () => {
    dispatch(updateMsgSoundSetting(!playSound));
  };
  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={toggleEnable} checked={playSound} />}
    ></SettingBlock>
  );
};

export default Index;
