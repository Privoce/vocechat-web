// import clsx from "clsx";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import Button from '../component/styled/Button';


interface Props {
  saveHandler: (e: MouseEvent) => void;
  resetHandler: (e: MouseEvent) => void;
}

const SaveTip: FC<Props> = ({ saveHandler, resetHandler }) => {
  const { t } = useTranslation("setting");
  // const btnClass=clsx("")
  return (
    <div className="z-[999] w-full max-w-lg p-2 fixed bottom-4 md:bottom-16
    flex flex-col md:flex-row items-center justify-between font-semibold text-gray-700 border 
    border-solid border-gray-200 dark:border-gray-400 bg-white dark:bg-gray-600 shadow-2xl dark:shadow-primary-400/50 rounded-full">
      <span className="p-2 text-sm dark:text-gray-200">{t('save_tip')}</span>
      <div className="flex items-center gap-3">
        <Button className="small ghost border_less !text-gray-700 !shadow-none dark:!text-gray-100" onClick={resetHandler}>
          {t('reset')}
        </Button>
        <Button className="small !rounded-full" onClick={saveHandler}>
          {t('save_change')}
        </Button>
      </div>
    </div>
  );
};

export default SaveTip;
