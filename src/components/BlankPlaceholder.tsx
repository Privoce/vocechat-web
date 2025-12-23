import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import Linkify from "linkify-react";

import { useAppSelector } from "@/app/store";
import IconEdit from "@/assets/icons/edit.svg";
import IconChat from "@/assets/icons/placeholder.chat.svg";
import IconDownload from "@/assets/icons/placeholder.download.svg";
import IconInvite from "@/assets/icons/placeholder.invite.svg";
import IconAsk from "@/assets/icons/placeholder.question.svg";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import UsersModal from "./UsersModal";
import { shallowEqual } from "react-redux";
import { KEY_ADMIN_ONLY_INVITE } from "../app/config";
import useServerExtSetting from "../hooks/useServerExtSetting";
import useLicense from "@/hooks/useLicense";
import { compareVersion } from "@/utils";

interface Props {
  type?: "chat" | "user";
}
const classes = {
  box: "w-[220px] md:w-[200px] h-[100px] md:h-[200px] cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-3xl flex-center flex-col gap-4",
  boxIcon: "w-7 h-7 md:w-10 md:h-10",
  boxTip: "px-5 text-xs md:text-sm text-slate-600 dark:text-gray-100 font-bold text-center",
};
const BlankPlaceholder: FC<Props> = ({ type = "chat" }) => {
  const navigate = useNavigate();
  const { getExtSetting } = useServerExtSetting();
  const onlyAdminCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const { t } = useTranslation("welcome");
  const server = useAppSelector((store) => store.server, shallowEqual);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [createChannelVisible, setCreateChannelVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(false);
  const toggleChannelModalVisible = () => {
    setCreateChannelVisible((prev) => !prev);
  };
  const toggleUserListVisible = () => {
    setUserListVisible((prev) => !prev);
  };
  const toggleInviteModalVisible = () => {
    setInviteModalVisible((prev) => !prev);
  };
  const chatTip = type == "chat" ? t("start_by_channel") : t("start_by_dm");
  const chatHandler = type == "chat" ? toggleChannelModalVisible : toggleUserListVisible;

  const { license: licenseInfo } = useLicense(true);

  const toLicensePage = () => {
    navigate("/setting/license");
  };
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const showVoceSpace = useMemo(
    () => compareVersion(currentVersion, "0.5.6") >= 0,
    [currentVersion]
  );

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
                  url: ({ content, attributes: { href: link } }) => {
                    return (
                      <>
                        <a
                          className="text-primary-400"
                          target="_blank"
                          href={link}
                          rel="noreferrer"
                        >
                          {content}
                        </a>
                      </>
                    );
                  },
                },
              }}
            >
              {server.description ? server.description : t("desc")}
            </Linkify>
            {isAdmin && (
              <NavLink
                to={"/setting/overview"}
                className="absolute top-0 -right-7 invisible group-hover:visible"
              >
                <IconEdit />
              </NavLink>
            )}
          </p>
        </div>
        <div
          style={{
            width: "432px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {(isAdmin || !onlyAdminCanInvite) && (
            <button className={classes.box} onClick={toggleInviteModalVisible}>
              <IconInvite className={classes.boxIcon} />
              <div className={classes.boxTip}>{t("invite")}</div>
            </button>
          )}

          {licenseInfo?.user_limit == 20 && showVoceSpace ? (
            <button onClick={toLicensePage} className={classes.box}>
              <svg
                viewBox="0 0 1028 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5677"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="39.5"
                height="39"
              >
                <path
                  d="M625.669087 392.461597l-47.150172-6.847535c-6.651891 0-13.499427-6.651891-16.825373-13.499427L538.020634 324.964463c-6.651891-10.173481-13.499427-16.825373-23.672908-16.825372s-16.825373 6.651891-20.151318 13.499426l-23.672908 47.150172c-3.325946 6.651891-10.173481 10.173481-16.825372 13.499427l-47.150172 6.651892c-10.173481 0-16.825373 6.847535-20.151319 16.825372-3.325946 10.173481 0 16.825373 6.651892 23.672908l37.172335 40.498281c3.325946 3.325946 6.651891 10.173481 6.651891 13.499426v3.325946l-10.173481 57.323653c0 10.173481 3.325946 16.825373 10.173481 23.672908 6.651891 6.651891 16.825373 6.651891 26.998854 0l40.49828-23.672908h10.173481c3.325946 0 6.847535 0 10.173481 3.325946l43.824227 23.672908c3.325946 3.325946 6.651891 3.325946 10.173481 3.325946 3.325946 0 10.173481 0 13.499426-3.325946 6.847535-6.651891 10.173481-13.499427 10.173482-23.672908l-10.173482-53.997707v-3.325946c0-6.651891 3.325946-10.173481 6.847536-16.825373l37.172335-40.49828c6.651891-6.651891 6.651891-16.825373 6.651891-23.672908-0.391288-9.977837-10.564769-16.629729-17.21666-16.629729z"
                  fill="#FFDB5D"
                  p-id="5678"
                  data-spm-anchor-id="a313x.search_index.0.i1.55193a81XeGIRV"
                ></path>
                <path
                  d="M512 0C229.294612 0 0 229.294612 0 512s229.294612 512 512 512 512-229.294612 512-512S794.901032 0 512 0z m-116.212457 798.618265s-33.650745-37.172335-63.975545-63.975544c-43.824226-13.499427-97.821934-23.672908-97.821933-23.672908l67.497134-114.647306c33.650745 47.150172 97.821934 84.322507 155.145587 97.821933l-60.845243 104.473825z m-97.821934-350.59381c0-114.647306 101.147879-222.447077 215.795186-222.447076 114.647306 0 215.795185 101.147879 215.795185 215.795185 0 114.647306-101.147879 215.795185-215.795185 215.795185-114.647306-0.195644-215.795185-94.495988-215.795186-209.143294z m401.069928 279.77073c-30.324799 30.324799-67.497134 70.82308-67.497134 70.82308l-60.649599-104.473825c57.323653-13.499427 114.647306-53.997707 148.298051-97.821933l70.82308 114.647306c0.195644-3.325946-47.150172 3.325946-90.974398 16.825372z"
                  fill="#FFDB5D"
                  p-id="5679"
                  data-spm-anchor-id="a313x.search_index.0.i0.55193a81XeGIRV"
                ></path>
              </svg>
              <div className={classes.boxTip}>{t("license")}</div>
            </button>
          ) : (
            <button onClick={chatHandler} className={classes.box}>
              <IconChat className={classes.boxIcon} />
              <div className={classes.boxTip}>{chatTip}</div>
            </button>
          )}

          {/* Vocespace nav to */}
          {showVoceSpace ? (
            <NavLink to={"/setting/video"} className={classes.box}>
              <svg
                width="39"
                height="39"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.2884 20.4182C29.7499 19.0293 29.9998 17.5438 29.9998 16C29.9998 8.26806 23.7319 2.00008 15.9999 2.00008C8.26798 2.00008 2 8.26806 2 16C2 17.5744 2.25987 19.088 2.73906 20.5005C3.09861 20.5088 3.43836 20.5246 3.74422 20.539C4.1999 20.5603 4.55678 20.5768 4.8465 20.571L4.85764 20.5707L4.9685 18.3288L4.96959 18.3067L4.97155 18.2847L5.09066 16.9465L5.0947 16.9011L5.1024 16.8562L5.23684 16.0725C5.376 15.2613 5.76653 14.5144 6.35326 13.9372C6.851 13.4475 7.44688 13.1183 8.07693 12.9487C7.43026 12.6087 6.98926 11.9304 6.98926 11.1491C6.98926 10.027 7.8989 9.11737 9.021 9.11737C10.1431 9.11737 11.0527 10.027 11.0527 11.1491C11.0527 11.9091 10.6355 12.5717 10.0175 12.9201C10.5584 13.0484 11.0773 13.2921 11.5345 13.6506C11.7371 13.3464 11.9714 13.0622 12.2347 12.8031C13.0209 12.0296 13.9873 11.55 14.9979 11.3626C14.1354 10.9827 13.5332 10.1204 13.5332 9.11741C13.5332 7.76315 14.631 6.6653 15.9853 6.6653C17.3396 6.6653 18.4374 7.76315 18.4374 9.11741C18.4374 10.1214 17.834 10.9845 16.9701 11.3638C17.9716 11.5504 18.9301 12.0227 19.7133 12.7789C19.9844 13.0407 20.2261 13.3293 20.4354 13.6391C20.8836 13.2519 21.3992 12.9818 21.9412 12.8296C21.3295 12.4794 20.9173 11.8204 20.9173 11.065C20.9173 9.94295 21.827 9.0333 22.9491 9.0333C24.0712 9.0333 24.9808 9.94295 24.9808 11.065C24.9808 11.8041 24.5862 12.4511 23.9961 12.8066C24.6416 12.9728 25.2529 13.3056 25.7617 13.8061C26.3485 14.3833 26.739 15.1303 26.8782 15.9415L27.0126 16.7252L27.0206 16.7717L27.0246 16.8187L27.1858 18.6893L27.1866 18.6993L27.1873 18.7094L27.3044 20.4304C27.337 20.4326 27.3723 20.4346 27.4104 20.4364C27.7961 20.4543 28.2307 20.4435 28.7617 20.4304C28.9274 20.4263 29.1025 20.422 29.2884 20.4182ZM28.3028 22.6866C27.9281 22.6925 27.586 22.6933 27.3064 22.6803C26.9334 22.663 26.476 22.6195 26.0838 22.4527C25.8728 22.3629 25.6172 22.2115 25.4138 21.9497C25.2432 21.7301 25.1474 21.4816 25.1142 21.2295L25.1073 21.23L24.9468 18.872L24.7906 17.0585L24.6642 16.3213C24.6046 15.9742 24.4375 15.6545 24.1864 15.4075C23.5405 14.7721 22.4925 14.7669 21.833 15.4036C21.6016 15.6271 21.4381 15.9122 21.3619 16.2213L21.4801 16.916L21.4824 16.93L21.4845 16.9441L21.7168 18.5553L21.7173 18.5587L21.8892 19.7777L21.9002 19.8558V19.9346V21.1257H21.9004C21.9004 21.6008 21.7303 22.0667 21.3626 22.4051C21.0107 22.7289 20.5693 22.8509 20.1747 22.8361C19.3976 22.807 18.5481 22.2065 18.5333 21.1537H18.5331V19.9907V19.9124L18.5439 19.8348L18.7541 18.3355L18.7541 18.3355L18.7553 18.327L18.9865 16.7647L18.9883 16.7527L18.9903 16.7407L19.081 16.2079L19.0664 16.122C18.9549 15.4666 18.6331 14.8586 18.1529 14.3948C16.9386 13.2223 15.0059 13.2279 13.8102 14.4043C13.3861 14.8216 13.0918 15.3511 12.9606 15.9291C12.9724 15.9842 12.9831 16.0396 12.9926 16.0953L13.1246 16.8717L13.1314 16.9113L13.1353 16.9513L13.2876 18.5165L13.4604 19.8436L13.4698 19.9158V19.9886V21.2518H13.4722C13.4722 21.7247 13.3041 22.1899 12.938 22.5288C12.587 22.8538 12.1455 22.9772 11.7497 22.9623C10.968 22.9328 10.1268 22.3267 10.1121 21.2798H10.1047V19.9486V19.8724L10.115 19.7969L10.2831 18.5639L10.2831 18.5638L10.5057 16.9316L10.5083 16.9124L10.5115 16.8934L10.6538 16.0641C10.5653 15.867 10.4393 15.6866 10.2819 15.5347C9.62251 14.898 8.57449 14.9031 7.92862 15.5385C7.67752 15.7855 7.51039 16.1052 7.45084 16.4524L7.32411 17.1911L7.21101 18.4618L7.08736 20.9622V21.2427H7.07764C7.06269 21.5177 6.97921 21.8038 6.79469 22.0616C6.59679 22.3381 6.33952 22.5026 6.11592 22.6007C5.70919 22.7791 5.24297 22.8098 4.89175 22.8169C4.54388 22.8239 4.14601 22.8065 3.75287 22.7882C6.14194 27.0893 10.731 29.9999 15.9999 29.9999C21.3102 29.9999 25.9299 27.0434 28.3028 22.6866ZM15.9853 8.81264C15.817 8.81264 15.6805 8.94909 15.6805 9.11741C15.6805 9.28573 15.817 9.42218 15.9853 9.42218C16.1536 9.42218 16.2901 9.28573 16.2901 9.11741C16.2901 8.94909 16.1536 8.81264 15.9853 8.81264ZM22.9491 10.8096C22.808 10.8096 22.6936 10.924 22.6936 11.065C22.6936 11.2061 22.808 11.3205 22.9491 11.3205C23.0901 11.3205 23.2045 11.2061 23.2045 11.065C23.2045 10.924 23.0901 10.8096 22.9491 10.8096ZM27.3471 21.0237H27.3448L27.3369 20.9082C27.3439 20.9486 27.3471 20.9875 27.3471 21.0237ZM4.84102 21.1507V21.0613C4.83587 21.0944 4.83379 21.1247 4.83379 21.1507H4.84102ZM8.76556 11.1491C8.76556 11.008 8.87993 10.8937 9.021 10.8937C9.16208 10.8937 9.27644 11.008 9.27644 11.1491C9.27644 11.2902 9.16208 11.4046 9.021 11.4046C8.87993 11.4046 8.76556 11.2902 8.76556 11.1491Z"
                  fill="url(#paint0_linear_1_116)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1_116"
                    x1="7.69527"
                    y1="22.0583"
                    x2="21.1597"
                    y2="11.4392"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#056CF2" />
                    <stop offset="1" stopColor="#4ECCC6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className={classes.boxTip}>{t("vocespace")}</div>
            </NavLink>
          ) : (
            <a
              href={"https://voce.chat#download"}
              target={"_blank"}
              rel="noreferrer"
              className={classes.box}
            >
              <IconDownload className={classes.boxIcon} />
              <div className={classes.boxTip}>{t("download")}</div>
            </a>
          )}
          {/* {!server.upgraded && (
            <>
              <a
                href={"https://voce.chat#download"}
                target={"_blank"}
                rel="noreferrer"
                className={classes.box}
              >
                <IconDownload className={classes.boxIcon} />
                <div className={classes.boxTip}>{t("download")}</div>
              </a>
              <a
                href={"https://doc.voce.chat"}
                target={"_blank"}
                rel="noreferrer"
                className={classes.box}
              >
                <IconAsk className={classes.boxIcon} />
                <div className={classes.boxTip}>{t("help")}</div>
              </a>
            </>
          )} */}

          <a
            href={"https://doc.voce.chat"}
            target={"_blank"}
            rel="noreferrer"
            className={classes.box}
          >
            <IconAsk className={classes.boxIcon} />
            <div className={classes.boxTip}>{t("help")}</div>
          </a>
        </div>
      </div>
      {createChannelVisible && (
        <ChannelModal personal={true} closeModal={toggleChannelModalVisible} />
      )}

      {userListVisible && <UsersModal closeModal={toggleUserListVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
    </>
  );
};

export default BlankPlaceholder;
