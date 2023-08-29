import { updateDraftMarkdown, updateDraftMixedText } from "@/app/slices/ui";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import { shallowEqual } from "react-redux";

const useDraft = ({ context = "dm", id = 0 }: { context: ChatContext; id: number }) => {
  const dispatch = useAppDispatch();
  const _key = `${context}_${id}`;
  const draftMarkdown = useAppSelector((store) => store.ui.draftMarkdown, shallowEqual);
  const draftMixedText = useAppSelector((store) => store.ui.draftMixedText, shallowEqual);

  const getUpdateDraft = (type = "mixed") => {
    const update = type == "mixed" ? updateDraftMixedText : updateDraftMarkdown;
    return (value: string) => {
      dispatch(update({ key: _key, value }));
    };
  };

  const getDraft = (type = "mixed") => {
    return type == "mixed" ? draftMixedText[_key] : draftMarkdown[_key];
  };

  return { getDraft, getUpdateDraft };
};
export default useDraft;
