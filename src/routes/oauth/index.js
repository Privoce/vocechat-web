import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import StyledWrapper from "./styled";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginMutation } from "../../app/services/auth";
import toast from "react-hot-toast";
import { setAuthData } from "../../app/slices/auth.data";

// import BASE_URL from "../../app/config";
// import { useCheckInviteTokenValidMutation } from "../../app/services/auth";

export default function OAuthPage() {
  const [
    login,
    { data, isSuccess, isError, error: loginError },
  ] = useLoginMutation();
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // const [token, setToken] = useState("");
  // const [valid, setValid] = useState(false);
  // const [sp] = useSearchParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    const startOauth = () => {
      if (!token) {
        setError("Token Not Found");
        return;
      }
      login({ key: token, type: "thirdparty" });
    };
    setTimeout(() => {
      startOauth();
    }, 1500);
  }, [token]);
  useEffect(() => {
    if (isError) {
      setError(loginError);
    }
  }, [isError, loginError]);

  useEffect(() => {
    if (isSuccess && data) {
      setLoading(false);
      // 更新本地认证信息
      console.log("login data", data);
      toast.success("login success");
      dispatch(setAuthData(data));
      navigateTo("/");
    }
  }, [isSuccess, data]);

  return (
    <StyledWrapper>
      {loading ? "loading" : ""}
      {error}
    </StyledWrapper>
  );
}
