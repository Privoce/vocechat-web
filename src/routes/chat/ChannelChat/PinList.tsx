import { FC, FormEvent } from "react";
import styled from "styled-components";
import usePinMessage from "../../../common/hook/usePinMessage";
import IconSurprise from "../../../assets/icons/emoji.surprise.svg";
import IconClose from "../../../assets/icons/close.svg";
import { useTranslation } from "react-i18next";
import PinnedMessage from "../../../common/component/PinnedMessage";
const Styled = styled.div`
  padding: 16px;
  background: #f9fafb;
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  min-width: 486px;
  max-height: 90vh;
  overflow-y: scroll;
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
  const { t } = useTranslation("chat");
  const { pins, unpinMessage, canPin } = usePinMessage(id);
  const handleUnpin = (evt: FormEvent<HTMLButtonElement>) => {
    const { mid } = evt.currentTarget.dataset;
    if (!mid) return;
    unpinMessage(+mid);
  };
  const noPins = pins.length == 0;
  return (
    <Styled>
      <h4 className="head">{t("pinned_msg")}({pins.length})</h4>
      {noPins ? (
        <div className="none">
          <IconSurprise />
          <div className="tip">{t("pin_empty_tip")}</div>
        </div>
      ) : (
        <ul className="list">
          {pins.map((data) => {
            return (
              <li key={data.mid} className="pin">
                <PinnedMessage data={data} />
                <div className="opts">
                  {canPin && (
                    <button className="btn" data-mid={data.mid} onClick={handleUnpin}>
                      <IconClose className="fill-slate-900" />
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
