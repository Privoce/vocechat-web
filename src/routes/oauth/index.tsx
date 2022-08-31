import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import StyledWrapper from "./styled";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginMutation } from "../../app/services/auth";
import toast from "react-hot-toast";
import { setAuthData } from "../../app/slices/auth.data";

export default function OAuthPage() {
  const [login, { data, isSuccess, isError }] = useLoginMutation();
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
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
      setError("Something Error");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      setLoading(false);
      // 更新本地认证信息
      toast.success("Login Successfully");
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
