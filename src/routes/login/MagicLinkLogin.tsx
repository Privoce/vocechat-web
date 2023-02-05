import { useNavigate } from "react-router-dom";
import Button from "../../common/component/styled/Button";

export default function MagicLinkLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    navigate("/send_magic_link");
    // signIn();
  };

  return <Button className="w-full" onClick={handleGoogleLogin}>Sign in with Magic Link</Button>;
}
