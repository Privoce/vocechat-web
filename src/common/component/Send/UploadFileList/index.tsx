import { useState, useEffect } from "react";
import Styled from "./styled";
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
    const info = stageFiles[idx];
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
  console.log("upload stageFiles", stageFiles);
  return (
    <>
      {editInfo && (
        <EditFileDetailsModal
          name={editInfo.name}
          updateName={updateFileName}
          closeModal={toggleModalVisible}
        />
      )}

      <Styled>
        {stageFiles.map(({ name, url, size, type }, idx) => {
          return (
            <li className="file" key={url}>
              <div className="preview">
                {type.startsWith("image") ? <img src={url} alt="image" /> : getFileIcon(type, name)}
              </div>
              <h4 className="name">{name}</h4>
              <span className="size">{formatBytes(size)}</span>
              <ul className="opts">
                <li className="opt edit" onClick={handleOpenEditModal.bind(null, idx)}>
                  <EditIcon />
                </li>
                <li
                  className="opt delete"
                  data-index={idx}
                  onClick={removeStageFile.bind(null, idx)}
                >
                  <DeleteIcon />
                </li>
              </ul>
            </li>
          );
        })}
      </Styled>
    </>
  );
}
