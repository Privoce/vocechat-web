// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGuestLoginQuery } from "../app/services/auth";
import { useAppSelector } from "../app/store";

// type Props = {};

const GuestLogining = () => {
  useGuestLoginQuery();
  const { token, guest } = useAppSelector((store) => store.authData);
  if (token && guest) return <Navigate to={"/"} replace />;
  return null;
};

export default GuestLogining;
