import { FC } from "react";
import Modal from "../Modal";
import IconClose from "../../../assets/icons/close.svg";
import Button from "../styled/Button";

interface Props {
  handleInstall?: () => void;
  closePrompt?: () => void;
}

const Prompt: FC<Props> = ({ handleInstall, closePrompt }) => {
  return (
    <Modal mask={false}>
      <div className="relative pointer-events-auto mt-4 w-[406px] p-4 rounded-md bg-white shadow-md flex flex-col gap-3">
        <IconClose className="absolute top-4 right-4 cursor-pointer" onClick={closePrompt} />
        <div className="flex flex-col gap-4 text-gray-600">
          <h2 className="font-semibold">Install web app on desktop?</h2>
          <p className="text-sm">Add to desktop for quick access to this app.</p>
        </div>
        <div className="w-full flex justify-end gap-4">
          <Button className="ghost cancel small" onClick={closePrompt}>
            Cancel
          </Button>
          <Button className="main small" onClick={handleInstall}>
            Install
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Prompt;
