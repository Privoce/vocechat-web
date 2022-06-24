import styled from "styled-components";
import CheckSign from "../../../assets/icons/check.sign.svg";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Search from "../Search";
import useFilteredChannels from "../../../common/hook/useFilteredChannels";

const Styled = styled.div`
  padding: 0 4px 4px 4px;
  background: #ffffff;
  max-height: 400px;
  overflow: auto;
  box-shadow: 0 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  > .search {
    z-index: 1;
    background-color: #fff;
    position: sticky;
    top: 0;
    input {
      z-index: 2;
    }
  }
  > .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
    .channel {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      .name {
        color: #616161;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
      }
      .check {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;

export default function Channel({ select = "", updateFilter }) {
  const { input, updateInput, channels } = useFilteredChannels();
  const handleClick = (gid) => {
    updateFilter({ channel: gid });
  };

  return (
    <Styled>
      <div className="search">
        <Search embed={true} value={input} updateSearchValue={updateInput} />
      </div>
      <ul className="list">
        <li className="channel" onClick={handleClick.bind(null, undefined)}>
          <ChannelIcon />
          <span className="name">Any Channel</span>
          {!select && <CheckSign className="check" />}
        </li>
        {channels.map(({ gid, is_public, name }) => {
          return (
            <li key={gid} className="channel" onClick={handleClick.bind(null, gid)}>
              <ChannelIcon personal={!is_public} />
              <span className="name">{name}</span>
              {select == gid && <CheckSign className="check" />}
            </li>
          );
        })}
      </ul>
    </Styled>
  );
}
