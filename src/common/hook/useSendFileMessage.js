import { useState, useRef } from "react";
// import { ContentTypes } from "../../app/config";
// import { sliceFile } from "../utils";
import { FILE_SLICE_SIZE } from "../../app/config";
import {
  usePrepareUploadFileMutation,
  useUploadFileMutation,
} from "../../app/services/message";
import { useSendMsgMutation } from "../../app/services/contact";
import { useSendChannelMsgMutation } from "../../app/services/channel";

export default function useUploadImageMessage({
  context = "user",
  from = null,
  to = null,
}) {
  // const slicedRef = useRef(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const sliceUploadedCountRef = useRef(0);
  const totalSliceCountRef = useRef(1);
  // const [uploadedSliceCount, setUploadedSliceCount] = useState(0)
  const [
    prepareUploadFile,
    { isLoading: isPreparing, isSuccess: isPrepared },
  ] = usePrepareUploadFileMutation();
  const [
    uploadFile,
    { isLoading: isUploading, isSuccess: isUploaded, isError: uploadFileError },
  ] = useUploadFileMutation();
  const [
    sendChannelMsg,
    {
      isLoading: channelSending,
      isSuccess: channelSuccess,
      isError: channelError,
    },
  ] = useSendChannelMsgMutation();

  const [
    sendUserMsg,
    { isLoading: userSending, isSuccess: userSuccess, isError: userError },
  ] = useSendMsgMutation();
  const sendFn = context == "user" ? sendUserMsg : sendChannelMsg;
  const uploadChunk = async (data) => {
    const { file_id, chunk, is_last } = data;
    const formData = new FormData();
    formData.append("file_id", file_id);
    formData.append("chunk_data", chunk);
    formData.append("chunk_is_last", is_last);
    return uploadFile(formData);
  };
  const sendFileMessage = async (file) => {
    if (!file) return;
    const { name, type: file_type, size: file_size } = file;
    // 拿file id
    const { data: file_id } = await prepareUploadFile();
    console.log("file id", file_id);

    let uploadResult = null;
    totalSliceCountRef.current = 1;
    setUploadingFile(true);
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
        try {
          const chunk = file.slice(
            FILE_SLICE_SIZE * idx,
            FILE_SLICE_SIZE * (idx + 1),
            file_type
          );

          if (idx == _arr.length - 1) {
            uploadResult = await uploadChunk({ file_id, chunk, is_last: true });
          } else {
            await uploadChunk({ file_id, chunk, is_last: false });
          }
          sliceUploadedCountRef.current = sliceUploadedCountRef.current + 1;
        } catch (error) {
          return;
        }
      }
      console.log("wtfff", uploadResult);
    }
    setUploadingFile(false);
    const {
      data: { path, size, hash },
    } = uploadResult;
    const content = JSON.stringify({
      name,
      size,
      hash,
      path,
    });
    console.log("upload content", content);
    await sendFn({
      id: to,
      content,
      type: "file",
      properties: { file_type },
      from_uid: from,
    });
  };
  const isSending =
    userSending || channelSending || isPreparing || uploadingFile;
  return {
    progress: isSending
      ? sliceUploadedCountRef.current / totalSliceCountRef.current
      : 1,
    sendFileMessage,
    isError: channelError || userError || uploadFileError,
    isSending,
    isSuccess: (channelSuccess || userSuccess) && isPrepared,
  };
}
