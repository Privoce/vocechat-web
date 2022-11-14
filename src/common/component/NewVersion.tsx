import { FC } from "react";
import toast from "react-hot-toast";
import Button from "./styled/Button";

interface Props {
  id: string;
  handleUpdate: () => void;
}

const Index: FC<Props> = ({ id, handleUpdate }) => {
  return (
    <div className="flex items-center gap-2">
      <strong className="whitespace-nowrap font-bold">New Version</strong> Available
      <div className="flex gap-1">
        <Button className="mini main" onClick={handleUpdate}>
          Update
        </Button>
        <Button className="mini cancel" onClick={() => toast.dismiss(id)}>
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default Index;
