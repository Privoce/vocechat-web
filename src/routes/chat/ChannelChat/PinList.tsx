import { FC, FormEvent } from "react";
import styled from "styled-components";
import usePinMessage from "../../../common/hook/usePinMessage";
import PreviewMessage from "../../../common/component/Message/PreviewMessage";
import IconSurprise from "../../../assets/icons/emoji.surprise.svg";
import IconClose from "../../../assets/icons/close.svg";
const Styled = styled.div`
  padding: 16px;
  background: #f9fafb;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  min-width: 486px;
  /* width: fit-content; */
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
    .pin {
      position: relative;
      border: 1px solid #f2f4f7;
      border-radius: var(--br);
      > .preview {
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
        top: 4px;
        right: 4px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        .btn {
          display: flex;
          background: none;
          border: none;
          svg {
            width: 16px;
            height: 16px;
            path {
              fill-opacity: 1;
              fill: #667085;
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
type Props = {
  id: number;
};
const PinList: FC<Props> = ({ id }: Props) => {
  const { pins, unpinMessage, canPin } = usePinMessage(id);
  const handleUnpin = (evt: FormEvent<HTMLButtonElement>) => {
    const { mid } = evt.currentTarget.dataset;
    if (!mid) return;
    unpinMessage(+mid);
  };
  const noPins = pins.length == 0;
  return (
    <Styled>
      <h4 className="head">Pinned Message({pins.length})</h4>

      {noPins ? (
        <div className="none">
          <IconSurprise />
          <div className="tip">This channel doesn’t have any pinned message yet.</div>
        </div>
      ) : (
        <ul className="list">
          {pins.map(({ mid }) => {
            return (
              <li key={mid} className="pin">
                <PreviewMessage mid={mid} />
                <div className="opts">
                  {canPin && (
                    <button className="btn" data-mid={mid} onClick={handleUnpin}>
                      <IconClose />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Styled>
  );
};
export default PinList;
