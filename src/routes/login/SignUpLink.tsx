import { useNavigate } from "react-router-dom";


export default function MagicLinkLogin() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="flex gap-1 mt-7 text-sm text-[#667085] justify-center">
      <span>Don’t have an account?</span>
      <a className="text-[#22d3ee]" onClick={handleSignUp}>Sign up</a>
    </div>
  );
}
