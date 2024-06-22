import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { getInviteLinkExpireList, getInviteLinkTimesList } from "@/app/config";
import useInviteLink from "@/hooks/useInviteLink";
import IconQuestion from "@/assets/icons/question.svg";
import Modal from "./Modal";
import QRCode from "./QRCode";
import Button from "./styled/Button";
import Input from "./styled/Input";
import StyledModal from "./styled/Modal";
import Select from "./styled/Select";

type Props = {
  context?: "members" | "channel";
  cid?: number;
};
const InviteLinkExpireList = getInviteLinkExpireList();
const InviteLinkTimesList = getInviteLinkTimesList();

const InviteLink: FC<Props> = ({ context = "members", cid }) => {
  const [current, setCurrent] = useState({
    expire: InviteLinkExpireList[4],
    times: InviteLinkTimesList[0]
  });
  const [selectExpire, setSelectExpire] = useState(current.expire);
  const [selectTimes, setSelectTimes] = useState(current.times);
  const [editVisible, setEditVisible] = useState(false);
  const { t } = useTranslation("chat");
  const { generating, link, linkCopied, copyLink, generateNewLink } = useInviteLink(cid);
  const handleNewLink = (data?: {
    expire: {
      label: string;
      value: number;
    };
    times: {
      label: string;
      value: number;
    };
  }) => {
    const { expire, times } = data ?? current;
    console.log({ expire });

    generateNewLink({ expire: expire.value, times: times.value });
  };
  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const handleUpdate = () => {
    setCurrent({
      expire: selectExpire,
      times: selectTimes
    });
    toggleEditVisible();
    handleNewLink({
      expire: selectExpire,
      times: selectTimes
    });
  };

  return (
    <>
      <div className="flex flex-col items-start pb-8">
        {context == "members" && (
          <p className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-50 flex flex-col md:flex-row gap-4">
            {t("share_invite_link")}
            <a
              className="text-primary-500 flex gap-1 items-center"
              href="http://doc.voce.chat/faq#fe_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconQuestion /> {t("invite_link_faq")}
            </a>
          </p>
        )}
        <div className="w-full md:w-[512px] mb-3 relative">
          <Input readOnly className={"large !pr-16"} placeholder="Generating" value={link} />
          <Button
            onClick={copyLink}
            className="ghost small border_less absolute right-1 top-1/2 -translate-y-1/2"
          >
            {linkCopied ? "Copied" : t("action.copy", { ns: "common" })}
          </Button>
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-100 flex gap-2">
          {t("invite_link_setting_tip", {
            expire: current.expire.label,
            times: current.times.label
          })}
          <button className="text-primary-500 flex gap-1 items-center" onClick={toggleEditVisible}>
            {t("invite_link_edit")}
          </button>
        </span>
        <div className="w-44 h-44 my-2">
          <QRCode size={1200} link={link} />
        </div>
        <Button
          className="ghost"
          disabled={generating}
          onClick={handleNewLink.bind(null, undefined)}
        >
          {generating ? `Generating` : t("generate_new_link")}
        </Button>
      </div>
      {editVisible && (
        <Modal id="modal-modal">
          <StyledModal
            compact
            title={"Update Invite Link Settings"}
            buttons={
              <>
                <Button onClick={toggleEditVisible} className="cancel small">
                  {t("action.cancel", { ns: "common" })}
                </Button>
                <Button className="main small" onClick={handleUpdate}>
                  Update
                </Button>
              </>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-start">
                <span className="text-sm dark:text-gray-100">Expire After:</span>
                <Select
                  options={InviteLinkExpireList.map((item) => {
                    const { label, value } = item;
                    return {
                      title: label,
                      value: `${value}`,
                      selected: selectExpire.value === value
                    };
                  })}
                  current={{
                    title: selectExpire.label
                  }}
                  updateSelect={(option) => {
                    setSelectExpire(
                      InviteLinkExpireList.find((item) => item.value === Number(option.value))!
                    );
                  }}
                ></Select>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="text-sm dark:text-gray-100">Max Times of Uses:</span>
                <Select
                  options={InviteLinkTimesList.map((item) => {
                    const { label, value } = item;
                    return {
                      title: label,
                      value: `${value}`,
                      selected: selectTimes.value === value
                    };
                  })}
                  current={{
                    title: selectTimes.label
                  }}
                  updateSelect={(option) => {
                    setSelectTimes(
                      InviteLinkTimesList.find((item) => item.value === Number(option.value))!
                    );
                  }}
                ></Select>
              </div>
            </div>
          </StyledModal>
        </Modal>
      )}
    </>
  );
};

export default InviteLink;
