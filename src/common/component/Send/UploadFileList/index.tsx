import { useState, useEffect } from "react";
import { useMixedEditor } from "../../MixedInput";
import EditFileDetailsModal from "./EditFileDetails";
import { getFileIcon, formatBytes } from "../../../utils";
import useUploadFile from "../../../hook/useUploadFile";
import EditIcon from "../../../../assets/icons/edit.svg";
import DeleteIcon from "../../../../assets/icons/delete.svg";

type EditProps = {
  index: number;
  name: string;
};
export default function UploadFileList({
  context,
  id
}: {
  context: "user" | "channel";
  id: number;
}) {
  const eidtor = useMixedEditor(`${context}_${id}`);
  const [editInfo, setEditInfo] = useState<EditProps | null>(null);
  const { stageFiles, updateStageFile, removeStageFile } = useUploadFile({
    context,
    id
  });
  const toggleModalVisible = (info: EditProps) => {
    setEditInfo((prev) => (prev ? null : info));
  };
  const handleOpenEditModal = (idx: number) => {
    const info = stageFiles[`${idx}`];
    if (!info) return;

    toggleModalVisible({ ...info, index: idx });
  };
  const updateFileName = (name: string) => {
    if (!name || !editInfo) return;
    const { index } = editInfo;
    updateStageFile(index, { name });
  };
  useEffect(() => {
    eidtor.focus();
  }, [stageFiles.length]);

  if (!context || !id || !stageFiles || stageFiles.length == 0) return null;

  return (
    <>
      {editInfo && (
        <EditFileDetailsModal
          name={editInfo.name}
          updateName={updateFileName}
          closeModal={toggleModalVisible}
        />
      )}

      <ul className="w-full overflow-auto flex justify-start p-4 pt-6 bg-gray-200 dark:bg-gray-800 rounded-t-lg">
        {stageFiles.map(({ name, url, size, type }, idx: number) => {
          return (
            <li className="group relative flex flex-col bg-gray-100 dark:bg-gray-700 rounded p-2" key={url}>
              <div className="flex-center w-40 h-40">
                {type.startsWith("image") ? <img className="w-full h-full object-cover" src={url} alt="image" /> : getFileIcon(type, name)}
              </div>
              <h4 className="w-40 mt-4 mb-0.5 font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{name}</h4>
              <span className="text-xs text-gray-500">{formatBytes(size)}</span>
              <ul className="invisible group-hover:visible bg-inherit border border-solid border-black/10 box-border rounded-md flex items-center absolute -right-5 -top-2.5">
                <li className="p-1 cursor-pointer edit" onClick={handleOpenEditModal.bind(null, idx)}>
                  <EditIcon />
                </li>
                <li
                  className="p-1 cursor-pointer delete"
                  data-index={idx}
                  onClick={removeStageFile.bind(null, idx)}
                >
                  <DeleteIcon />
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
