import useCopy from "@/hooks/useCopy";
import IconDownload from "@/assets/icons/download.svg";
import IconCopy from "@/assets/icons/copy.svg";

type Props = {
  copyLink: string;
  downloadLink: string;
};

const DownloadArea = ({ copyLink, downloadLink }: Props) => {
  const { copy, copied } = useCopy();
  return (
    <div className="flex flex-col-reverse gap-1.5 items-center">
      <button
        className="hidden md:block whitespace-nowrap"
        disabled={copied}
        onClick={copy.bind(null, copyLink, false)}
      >
        <IconCopy className="size-6 fill-gray-500 dark:fill-gray-400" />
      </button>
      <a className="hidden md:block whitespace-nowrap" download={name} href={downloadLink}>
        <IconDownload className="fill-gray-500 dark:fill-gray-400" />
      </a>
    </div>
  );
};

export default DownloadArea;
