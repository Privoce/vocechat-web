import { useAppSelector } from "../app/store";

type Props = {
  uid: number;
  name?: string;
  showName?: boolean;
};

const NameWithRemark = ({ uid, name = "", showName = true }: Props) => {
  const remark = useAppSelector((store) => store.footprint.remarkMap[uid]);
  if (!remark) return name;
  return (
    <>
      {remark} {showName ? `(${name})` : null}
    </>
  );
};

export default NameWithRemark;
