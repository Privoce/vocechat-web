import { MouseEvent } from "react";
import styled from "styled-components";
import FavoredMessage from "../../common/component/Message/FavoredMessage";
import IconSurprise from "../../assets/icons/emoji.surprise.svg";
import IconRemove from "../../assets/icons/close.svg";
import useFavMessage from "../../common/hook/useFavMessage";

const Styled = styled.div`
  padding: 16px;
  background: #f9fafb;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  min-width: 500px;
  max-height: 500px;
  overflow: auto;
  > .head {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #344054;
    margin-bottom: 16px;
  }
  > .none {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    .tip {
      width: 240px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #475467;
    }
  }
  > .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .fav {
      position: relative;
      border: 1px solid #f2f4f7;
      border-radius: var(--br);
      .favorite {
        background: none;
        .down img {
          width: 100% !important;
          height: auto !important;
        }
      }
      > .opts {
        visibility: hidden;
        display: flex;
        align-items: center;
        gap: 4px;
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .btn {
          display: flex;
          background: none;
          border: none;
          svg {
            width: 24px;
            height: 24px;
            path {
              fill: #667085;
              fill-opacity: 1;
            }
          }
        }
      }
      &:hover .opts {
        visibility: visible;
      }
    }
  }
`;

export default function FavList({ cid = null, uid = null }) {
  const { favorites, removeFavorite } = useFavMessage({ cid, uid });
  const handleRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    const { id } = evt.currentTarget.dataset;
    console.log("remove fav", id);
    removeFavorite(id);
  };
  const noFavs = favorites.length == 0;
  return (
    <Styled>
      <h4 className="head">Saved Message({favorites.length})</h4>
      {noFavs ? (
        <div className="none">
          <IconSurprise />
          <div className="tip">This channel doesn’t have any saved message yet.</div>
        </div>
      ) : (
        <ul className="list">
          {favorites.map(({ id }) => {
            return (
              <li key={id} className="fav">
                <FavoredMessage id={id} />
                <div className="opts">
                  {/* <button
                    className="btn"
                    data-mid={mid}
                    // onClick={handleRemove}
                  >
                    <IconForward />
                  </button> */}
                  <button className="btn" data-id={id} onClick={handleRemove}>
                    <IconRemove />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Styled>
  );
}
