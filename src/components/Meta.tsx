import { FC } from "react";
import { Helmet } from "react-helmet";
import { useAppSelector } from "@/app/store";

type Props = {};
const Meta: FC<Props> = () => {
  const { name, logo } = useAppSelector((store) => store.server);
  return (
    <Helmet>
      {name && <title>{name} Web App</title>}
      {logo && <link rel="icon" href={`${logo}?ts=${new Date().getTime()}`} />}
    </Helmet>
  );
};
export default Meta;
