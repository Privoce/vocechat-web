import { useNavigate } from "react-router-dom";

import Button from "@/components/styled/Button";

type Props = {
  email: string;
};
export default function MagicLinkLogin({ email }: Props) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(`/send_magic_link/${email}`);
  };

  return (
    <Button className="w-full ghost" onClick={handleLogin}>
      Sign in with a Magic Link
    </Button>
  );
}
