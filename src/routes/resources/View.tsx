import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { updateFileListView } from "../../app/slices/ui";
import IconList from "../../assets/icons/file.list.svg";
import IconGrid from "../../assets/icons/file.grid.svg";
import clsx from "clsx";

const getClass = (selected: boolean) => clsx(`cursor-pointer p-2 box-border flex-center`, selected && `border border-solid border-primary-400 shadow rounded-lg`);
type Props = {
  view?: "item" | "grid"
}
export default function View({ view = "item" }: Props) {
  const dispatch = useDispatch();
  const handleChangeView = (evt: MouseEvent<HTMLLIElement>) => {
    const { view: clickView } = evt.currentTarget.dataset;
    if (clickView == view) return;
    dispatch(updateFileListView(view == "item" ? "grid" : "item"));
  };
  const isGrid = view == "grid";
  return (
    <ul className={`flex border border-solid shadow rounded-lg box-border`}>
      <li className={getClass(!isGrid)} data-view={"item"} onClick={handleChangeView}>
        <IconList className={`${!isGrid ? "fill-primary-400" : ""} dark:fill-white`} />
      </li>
      <li className={getClass(isGrid)} data-view={"grid"} onClick={handleChangeView}>
        <IconGrid className={`${isGrid ? "fill-primary-400" : ""} dark:fill-white`} />
      </li>
    </ul>
  );
}
