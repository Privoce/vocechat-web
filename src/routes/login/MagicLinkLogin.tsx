import { useNavigate } from "react-router-dom";
import Button from "../../common/component/styled/Button";

export default function MagicLinkLogin() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/send_magic_link");
  };

  return <Button className="w-full" onClick={handleLogin}>Sign in with Magic Link</Button>;
}
