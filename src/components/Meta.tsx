import { FC } from "react";
import { Helmet } from "react-helmet";

import BASE_URL from "@/app/config";
import { useGetServerQuery } from "@/app/services/server";

type Props = {};
const Meta: FC<Props> = () => {
  const { data, isSuccess } = useGetServerQuery();
  if (isSuccess) {
    <Helmet>
      <title>{data.name} Web App</title>
      <link rel="icon" href={`${BASE_URL}/resource/organization/logo`} />
    </Helmet>;
  }
  return (
    <Helmet>
      <link rel="icon" href={`${BASE_URL}/resource/organization/logo`} />
    </Helmet>
  );
};
export default Meta;
