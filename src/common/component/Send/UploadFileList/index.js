import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "./styled";
import { useMixedEditor } from "../../MixedInput";
import EditFileDetailsModal from "./EditFileDetails";
import { updateUploadFiles } from "../../../../app/slices/ui";
import { getFileIcon, formatBytes } from "../../../utils";
import EditIcon from "../../../../assets/icons/edit.svg";
import DeleteIcon from "../../../../assets/icons/delete.svg";

export default function UploadFileList({ context = "", id = null }) {
  const eidtor = useMixedEditor(`${context}_${id}`);
  const [editInfo, setEditInfo] = useState(null);
  const dispatch = useDispatch();
  const files = useSelector(
    (store) => store.ui.uploadFiles[`${context}_${id}`] || []
  );
  const toggleModalVisible = (info) => {
    setEditInfo((prev) => (prev ? null : info));
  };
  const handleOpenEditModal = (idx) => {
    const info = files[idx];
    if (!info) return;

    toggleModalVisible({ ...info, index: idx });
  };
  const handleRemove = (idx) => {
    dispatch(
      updateUploadFiles({ context, id, operation: "remove", index: idx })
    );
  };
  const updateFileName = (name) => {
    if (!name) return;
    const { index } = editInfo;
    dispatch(
      updateUploadFiles({ context, id, operation: "update", index, name })
    );
  };
  useEffect(() => {
    eidtor.focus();
  }, [files.length]);

  if (!context || !id || !files || files.length == 0) return null;
  console.log("upload files", files);
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
        {files.map(({ name, url, size, type }, idx) => {
          return (
            <li className="file" key={url}>
              <div className="preview">
                {type.startsWith("image") ? (
                  <img src={url} alt="image" />
                ) : (
                  getFileIcon(type, name)
                )}
              </div>
              <h4 className="name">{name}</h4>
              <span className="size">{formatBytes(size)}</span>
              <ul className="opts">
                <li
                  className="opt edit"
                  onClick={handleOpenEditModal.bind(null, idx)}
                >
                  <EditIcon />
                </li>
                <li
                  className="opt delete"
                  data-index={idx}
                  onClick={handleRemove.bind(null, idx)}
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
