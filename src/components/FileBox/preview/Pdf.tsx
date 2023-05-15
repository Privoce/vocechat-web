import { FC } from "react";

interface Props {
  url: string;
}

const Pdf: FC<Props> = ({ url }) => {
  return (
    <div className="p-2 overflow-hidden">
      <embed className="w-full h-full" src={url} type="application/pdf" />
    </div>
  );
};

export default Pdf;
