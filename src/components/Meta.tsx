import { FC } from "react";
import { useAppSelector } from "@/app/store";
import { useGetServerQuery } from "@/app/services/server";
import { shallowEqual } from "react-redux";

type Props = {};
const Meta: FC<Props> = () => {
  useGetServerQuery();
  const { name, logo } = useAppSelector((store) => store.server, shallowEqual);
  return (
    <>
      {name && <title>{name} Web App</title>}
      {logo && <link rel="icon" href={`${logo}?ts=${new Date().getTime()}`} />}
    </>
  );
};
export default Meta;
