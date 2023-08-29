import { useRef, useState } from "react";
import toast from "react-hot-toast";
import heic2any from "heic2any";

import BASE_URL, { FILE_SLICE_SIZE } from "@/app/config";
import { usePrepareUploadFileMutation, useUploadFileMutation } from "@/app/services/message";
import { updateUploadFiles } from "@/app/slices/ui";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Message } from "@/types/channel";
import { ChatContext } from "@/types/common";
import { UploadFileResponse } from "@/types/message";
import { shallowEqual } from "react-redux";

export type UploadFileData = {
  name: string;
  type: string;
  size: number;
  url: string;
  converting?: boolean;
};
interface IProps {
  context: ChatContext;
  id: number;
}
const convertHeic2Jpg = async (file: { name: string; type: string; size: number; url: string }) => {
  const res = await fetch(file.url);
  const blob = await res.blob();
  const jpgBlob = (await heic2any({
    blob,
    toType: "image/jpeg",
    quality: 0.8
  })) as Blob;
  const newName = file.name.replace(/\.hei\w$/i, ".jpg");
  return { ...file, name: newName, converting: false, url: URL.createObjectURL(jpgBlob) };
};
const useUploadFile = (props?: IProps) => {
  const { context, id } = props ? props : { context: "channel", id: 0 };
  const dispatch = useAppDispatch();
  const stageFiles = useAppSelector(
    (store) => store.ui.uploadFiles[`${context}_${id}`] || [],
    shallowEqual
  );
  const replying = useAppSelector(
    (store) => store.message.replying[`${context}_${id}`],
    shallowEqual
  );
  const [data, setData] = useState<Message | null>(null);
  const canceledRef = useRef(false);
  const sliceUploadedCountRef = useRef(0);
  const totalSliceCountRef = useRef(1);
  const [prepareUploadFile, { isLoading: isPreparing, isError: prepareFileError }] =
    usePrepareUploadFileMutation();
  const [uploadFileFn, { isLoading: isUploading, isError: uploadFileError }] =
    useUploadFileMutation();

  const uploadChunk = (data: { file_id: string; chunk: Blob; is_last: boolean }) => {
    const { file_id, chunk, is_last } = data;
    const formData = new FormData();
    formData.append("file_id", file_id);
    formData.append("chunk_data", chunk);
    formData.append("chunk_is_last", `${is_last}`);
    return uploadFileFn(formData);
  };

  const uploadFile = async (file?: File) => {
    if (!file) return;
    console.log("up file", file);

    setData(null);
    const {
      name = `-${+new Date()}.${file.type.split("/")[1]}`,
      type: file_type,
      size: file_size
    } = file;
    console.log("file type", file_type);
    // 生成 file id
    const resp = await prepareUploadFile({
      content_type: file_type,
      filename: name
    });
    console.log("prepareUploadFile", resp);
    if ("error" in resp) {
      // toast.error("Prepare Upload File Error");
      return;
    }
    const file_id = resp.data;

    let uploadResult = null;
    canceledRef.current = false;
    totalSliceCountRef.current = 1;
    sliceUploadedCountRef.current = 0;
    // setUploadingFile(true);
    // 2MB
    if (file_size <= FILE_SLICE_SIZE) {
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
        if (canceledRef.current) break;
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
          console.error("upload file error", error);
          canceledRef.current = true;
          return;
        }
      }
    }
    // 出错 则返回
    if (!uploadResult || "error" in uploadResult || !uploadResult.data) {
      console.error("upload file error uploadResult:", uploadResult);
      return;
    }
    const { path, size, hash } = uploadResult.data as UploadFileResponse;
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
    canceledRef.current = true;
  };

  const removeStageFile = (idx: number) => {
    dispatch(updateUploadFiles({ context, id, operation: "remove", index: idx }));
  };

  const addStageFile = (filesData: UploadFileData[]) => {
    if (replying) {
      toast.error("Only text is supported when replying a message");
      return;
    }

    const heifs: number[] = [];
    filesData.forEach((f, idx) => {
      if (f.type.startsWith("image/hei")) {
        f.converting = true;
        heifs.push(idx);
      }
    });
    dispatch(updateUploadFiles({ context, id, data: filesData }));
    if (heifs.length) {
      heifs.forEach((idx) => {
        convertHeic2Jpg(filesData[idx]).then((res) => {
          console.log("heif2jpg", res);
          dispatch(updateUploadFiles({ context, id, data: res, operation: "replace", idx }));
        });
      });
    }
  };

  const resetStageFiles = () => {
    dispatch(updateUploadFiles({ context, id, operation: "reset" }));
  };

  const updateStageFile = (idx: number, data = {}) => {
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
    progress: +Number((sliceUploadedCountRef.current / totalSliceCountRef.current) * 100).toFixed(
      2
    ),
    uploadFile,
    isError: uploadFileError || prepareFileError,
    isSuccess: !!data,
    stageFiles,
    addStageFile,
    resetStageFiles,
    removeStageFile,
    updateStageFile
  };
};
export default useUploadFile;
