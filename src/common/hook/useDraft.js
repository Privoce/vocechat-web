// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateDraftMarkdown, updateDraftMixedText } from "../../app/slices/ui";
export default function useDraft({ context = "", id = "" }) {
  const dispatch = useDispatch();
  const _key = `${context}_${id}`;
  const { draftMarkdown, draftMixedText } = useSelector((store) => {
    return {
      draftMarkdown: store.ui.draftMarkdown,
      draftMixedText: store.ui.draftMixedText
    };
  });

  const getUpdateDraft = (type = "mixed") => {
    const update = type == "mixed" ? updateDraftMixedText : updateDraftMarkdown;
    return (value) => {
      dispatch(update({ key: _key, value }));
    };
  };
  const getDraft = (type = "mixed") => {
    return type == "mixed" ? draftMixedText[_key] : draftMarkdown[_key];
  };
  return { getDraft, getUpdateDraft };
}
