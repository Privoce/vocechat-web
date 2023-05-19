import { ChangeEvent, useState } from "react";

import CloseIcon from "@/assets/icons/close.svg";
import Modal from "../../Modal";
import Button from "../../styled/Button";
import Input from "../../styled/Input";

export default function EditFileDetails({
  name,
  closeModal,
  updateName
}: {
  name: string;
  closeModal: (p?: any) => void;
  updateName: (name: string) => void;
}) {
  const [fileName, setFileName] = useState(name);
  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFileName(evt.target.value);
  };
  const handleUpdate = () => {
    updateName(fileName);
    closeModal();
  };

  return (
    <Modal>
      <div className="bg-white dark:bg-gray-800 flex flex-col drop-shadow rounded-xl p-4 w-[406px]">
        <h4 className="flex items-center justify-between font-semibold text-lg text-gray-700 dark:text-gray-100 w-full">
          File Details <CloseIcon className="cursor-pointer dark:fill-white" onClick={closeModal} />
        </h4>
        <div className="py-4 flex flex-col gap-2">
          <label className="font-semibold text-sm text-gray-600 dark:text-gray-200" htmlFor="name">
            Name
          </label>
          <Input id="name" value={fileName} onChange={handleNameChange} />
        </div>
        <div className="flex justify-end gap-4 mt-8 w-full">
          <Button className="ghost cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}
