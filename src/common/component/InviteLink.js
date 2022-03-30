import { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  useLazyCreateInviteLinkQuery,
  useGetSMTPConfigQuery,
} from "../../app/services/server";
import Button from "./styled/Button";
import useCopy from "../hook/useCopy";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 32px;
  .tip {
    font-weight: 500;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .link {
    width: 512px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
    border-radius: 4px;
    padding: 3px 4px 3px 8px;
    .content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 512px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #78787c;
    }
  }
  .sub_tip {
    margin-left: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
    margin-bottom: 20px;
  }
`;
export default function InviteLink() {
  const {
    data: config,
    isSuccess: configQuerySuccess,
  } = useGetSMTPConfigQuery();
  const [copid, copy] = useCopy();
  const {
    inviteLink: { link },
    loginUser,
  } = useSelector((store) => {
    return {
      inviteLink: store.server.inviteLink,
      loginUser: store.contacts.byId[store.authData.uid],
    };
  });
  const [createLink, { isLoading }] = useLazyCreateInviteLinkQuery();
  useEffect(() => {
    if (!link && loginUser && loginUser.is_admin) {
      createLink();
    }
  }, [link, loginUser]);
  const handleNewLink = () => {
    createLink();
  };
  if (!loginUser || !loginUser.is_admin || !configQuerySuccess) return null;
  let finalLink = null;
  if (link) {
    const tmpURL = new URL(link);
    tmpURL.searchParams.set("code", config.enabled);
    finalLink = tmpURL.href;
  }
  return (
    <StyledWrapper>
      <span className="tip">
        Share this link to invite people to this server.
      </span>
      <div className="link">
        <span title={finalLink} className="content">
          {finalLink}
        </span>
        <Button onClick={copy.bind(null, finalLink)} className="main">
          {copid ? "Copied" : `Copy`}
        </Button>
      </div>
      <span className="sub_tip">Invite link expires in 7 days.</span>
      <Button className="ghost" disabled={isLoading} onClick={handleNewLink}>
        {isLoading ? `Generating` : `Generate New Link`}
      </Button>
    </StyledWrapper>
  );
}
