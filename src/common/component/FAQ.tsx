import { FC } from "react";
import { useGetServerVersionQuery } from "../../app/services/server";
type Props = {};
const FAQ: FC<Props> = () => {
  const { data: serverVersion } = useGetServerVersionQuery();
  return (
    <div className="flex flex-col gap-3">
      <div className="item">Client Version: {process.env.VERSION}</div>
      <div className="item">Server Version: {serverVersion}</div>
      <div className="item">Build Timestamp: {process.env.REACT_APP_BUILD_TIME}</div>
    </div>
  );
};
export default FAQ;
