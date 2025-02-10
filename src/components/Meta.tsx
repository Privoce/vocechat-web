import { useAppSelector } from "@/app/store";
import { useGetServerQuery } from "@/app/services/server";
import { shallowEqual } from "react-redux";

const Meta = () => {
  useGetServerQuery();
  const { name, logo } = useAppSelector((store) => store.server, shallowEqual);
  console.log({name});
  if(!name) return null
  return (
    <>
      {name && <title>{`${name} Web App`}</title>}
      {logo && <link rel="icon" href={`${logo}?ts=${new Date().getTime()}`} />}
    </>
  );
};
export default Meta;
