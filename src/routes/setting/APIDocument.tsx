// import React from 'react';
import { useTranslation } from "react-i18next";

import IconCopy from "@/assets/icons/copy.svg";
import { useAppSelector } from "../../app/store";
import useCopy from "../../hooks/useCopy";

// type Props = {}
const APIUrl = `${location.origin}/api/swagger`;
const APIDocument = () => {
  const token = useAppSelector((store) => store.authData.token);
  const { copy } = useCopy();
  const { t } = useTranslation("setting");
  const handleCopy = () => {
    copy(token);
  };
  return (
    <section className="flex flex-col justify-start items-start gap-4">
      <div className="font-semibold dark:text-white">{t("api_doc.desc")}</div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-gray-700 dark:text-white text-lg font-semibold flex gap-1">
          {t("api_doc.access")}
          <a
            href={APIUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary-600"
          >
            {APIUrl}
          </a>
        </h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-gray-700 dark:text-white text-lg font-semibold">
          {t("api_doc.use_method")}
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-700 dark:text-white ">{t("api_doc.step_1")}</h3>
            {/* <div className="flex flex-col gap-1"> */}
            <img
              className="border border-solid rounded-md border-gray-300 shadow-lg md:w-[50%]"
              src="https://s.voce.chat/web_client/assets/img/api.doc.step1.png"
              alt="step 1"
            />
            {/* </div> */}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-700 dark:text-white flex flex-col items-start gap-2">
              {t("api_doc.step_2")}{" "}
              <span className="text-gray-400 dark:text-white text-xs">
                ({t("api_doc.step_2_desc")})
              </span>
            </h3>
            <div className="flex flex-col border border-solid border-green-500 bg-green-100 rounded-md p-2 w-fit break-words text-sm relative">
              <p className="break-all md:max-w-4xl font-bold">
                {token}
                <IconCopy
                  onClick={handleCopy}
                  className="absolute right-2 bottom-2 cursor-pointer"
                />
              </p>
            </div>
            <img
              className="border border-solid rounded-md border-gray-300 shadow-lg md:w-[85%]"
              src="https://s.voce.chat/web_client/assets/img/api.doc.step2.jpg"
              alt="step 2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-700 dark:text-white flex items-center gap-2">
              {t("api_doc.last")}
            </h3>
            <img
              className="border border-solid rounded-md border-gray-300 shadow-lg md:w-[85%]"
              src="https://s.voce.chat/web_client/assets/img/api.doc.step3.png"
              alt="step 3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default APIDocument;
