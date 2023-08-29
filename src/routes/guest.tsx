// import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useLazyGuestLoginQuery } from "../app/services/auth";
import { useAppSelector } from "../app/store";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

// type Props = {};

const GuestLogin = () => {
  const [guestLogin] = useLazyGuestLoginQuery();
  const token = useAppSelector((store) => store.authData.token, shallowEqual);
  const guest = useAppSelector((store) => store.authData.guest, shallowEqual);
  useEffect(() => {
    if (!guest || !token) {
      guestLogin();
    }
  }, [guest, token]);
  console.log("guest", token, guest);

  if (token && guest) return <Navigate to={"/"} replace />;
  return null;
};

export default GuestLogin;
