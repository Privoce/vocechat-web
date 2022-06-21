import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { updateUploadFiles } from "../../app/slices/ui";
import BASE_URL, { FILE_SLICE_SIZE } from "../../app/config";
import { usePrepareUploadFileMutation, useUploadFileMutation } from "../../app/services/message";
import { useAppDispatch, useAppSelector } from "../../app/store";

export default function useUploadFile(props = {}) {
  const { context = "", id = "" } = props;
  const dispatch = useAppDispatch();
  const { stageFiles, replying } = useAppSelector((store) => {
    return {
      stageFiles: store.ui.uploadFiles[`${context}_${id}`] || [],
      replying: store.message.replying[`${context}_${id}`]
    };
  });
  const [data, setData] = useState(null);
  // const [uploadingFile, setUploadingFile] = useState(false);
  const canneledRef = useRef(false);
  const sliceUploadedCountRef = useRef(0);
  const totalSliceCountRef = useRef(1);
  const [prepareUploadFile, { isLoading: isPreparing, isSuccess: isPrepared }] =
    usePrepareUploadFileMutation();
  const [
    uploadFileFn,
    { isLoading: isUploading, isSuccess: isUploaded, isError: uploadFileError }
  ] = useUploadFileMutation();

  const uploadChunk = (data) => {
    const { file_id, chunk, is_last } = data;
    const formData = new FormData();
    formData.append("file_id", file_id);
    formData.append("chunk_data", chunk);
    formData.append("chunk_is_last", is_last);
    return uploadFileFn(formData);
  };

  const uploadFile = async (file) => {
    if (!file) return;
    setData(null);
    const {
      name = `rustchat-${+new Date()}.${file.type.split("/")[1]}`,
      type: file_type,
      size: file_size
    } = file;
    // 拿file id
    const { data: file_id } = await prepareUploadFile({
      content_type: file_type,
      filename: name
    });
    console.log("file id", file_id);

    let uploadResult = null;
    canneledRef.current = false;
    totalSliceCountRef.current = 1;
    sliceUploadedCountRef.current = 0;
    // setUploadingFile(true);
    // 2MB
    if (file_size <= 1000 * 1000 * 2) {
      // 一次性上传文件
      uploadResult = await uploadChunk({ file_id, chunk: file, is_last: true });
      sliceUploadedCountRef.current = 1;
    } else {
      // 分片上传文件
      totalSliceCountRef.current = Math.ceil(file_size / FILE_SLICE_SIZE);
      const totalSliceCount = totalSliceCountRef.current;
      const _arr = new Array(totalSliceCount);
      //  const chunk=file.slice(block_size * index, block_size * (index + 1));

      for await (const [idx] of _arr.entries()) {
        // 退出循环
        if (canneledRef.current) break;
        try {
          const chunk = file.slice(FILE_SLICE_SIZE * idx, FILE_SLICE_SIZE * (idx + 1), file_type);

          uploadResult = await uploadChunk({
            file_id,
            chunk,
            // 如果是最后一个chunk，标记下
            is_last: idx == _arr.length - 1
          });
          sliceUploadedCountRef.current++;
        } catch (error) {
          console.log("upload file error", error);
          return;
        }
      }
      console.log("wtfff", uploadResult);
    }
    // setUploadingFile(false);
    const {
      data: { path, size, hash }
    } = uploadResult;
    const encodedPath = encodeURIComponent(path);
    const res = {
      name,
      file_type,
      path,
      size,
      hash,
      url: `${BASE_URL}/resource/file?file_path=${encodedPath}`,
      thumbnail: file_type.startsWith("image")
        ? `${BASE_URL}/resource/file?file_path=${encodedPath}&thumbnail=true`
        : "",
      download: `${BASE_URL}/resource/file?file_path=${encodedPath}&download=true`
    };
    setData(res);
    return res;
  };

  const stopUploading = () => {
    canneledRef.current = true;
  };

  const removeStageFile = (idx) => {
    dispatch(updateUploadFiles({ context, id, operation: "remove", index: idx }));
  };

  const addStageFile = (fileData = {}) => {
    if (replying) {
      toast.error("Only text is supported when replying a message");
      return;
    }
    dispatch(updateUploadFiles({ context, id, data: fileData }));
  };

  const resetStageFiles = () => {
    dispatch(updateUploadFiles({ context, id, operation: "reset" }));
  };

  const updateStageFile = (idx, data = {}) => {
    dispatch(
      updateUploadFiles({
        context,
        id,
        operation: "update",
        index: idx,
        ...data
      })
    );
  };

  return {
    stopUploading,
    data,
    isUploading: isPreparing || isUploading,
    progress: Number((sliceUploadedCountRef.current / totalSliceCountRef.current) * 100).toFixed(2),
    uploadFile,
    isError: uploadFileError,
    isSuccess: !!data,
    stageFiles,
    addStageFile,
    resetStageFiles,
    removeStageFile,
    updateStageFile
  };
}
