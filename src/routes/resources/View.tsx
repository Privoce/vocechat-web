import { MouseEvent } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateFileListView } from "../../app/slices/ui";
import { Views } from "../../app/config";
import IconList from "../../assets/icons/file.list.svg";
import IconGrid from "../../assets/icons/file.grid.svg";

const Styled = styled.ul`
  display: flex;
  border: 1px solid #d0d5dd;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  box-sizing: border-box;

  .view {
    cursor: pointer;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.item .item,
  &.grid .grid {
    border: 1px solid #52edff;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    svg {
      transition: all 0.2s ease;
      path {
        fill: #52edff;
      }
    }
  }
`;

export default function View({ view = Views.item }) {
  const dispatch = useDispatch();
  const handleChangeView = (evt: MouseEvent<HTMLLIElement>) => {
    const { view: clickView } = evt.currentTarget.dataset;
    if (clickView == view) return;
    dispatch(updateFileListView(view == Views.item ? Views.grid : Views.item));
  };

  return (
    <Styled className={view}>
      <li className="view item" data-view={Views.item} onClick={handleChangeView}>
        <IconList />
      </li>
      <li className="view grid" data-view={Views.grid} onClick={handleChangeView}>
        <IconGrid />
      </li>
    </Styled>
  );
}
