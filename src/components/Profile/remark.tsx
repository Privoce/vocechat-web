import { useAppSelector } from "../../app/store";
import ServerVersionChecker from "../ServerVersionChecker";

type Props = {
  uid: number;
};

const Remark = ({ uid }: Props) => {
  const remark = useAppSelector((store) => store.footprint.remarkMap[uid] || "");
  return (
    <ServerVersionChecker empty version="0.5.0">
      <div className="flex items-center gap-1 text-white py-2">
        <div className="flex items-center gap-1">
          <span>{remark}</span>
        </div>
      </div>
    </ServerVersionChecker>
  );
};

export default Remark;
