import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useSearchParams } from "react-router-dom";
type ContextType = { token: string };
export default function RegContainer() {
  const [token, setToken] = useState("");
  let [searchParams] = useSearchParams(new URLSearchParams(location.search));
  const magic_token = searchParams.get("magic_token") ?? "";
  useEffect(() => {
    setToken(magic_token);
  }, [magic_token]);

  return (
    <div className="flex-center h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700">
      <div className="py-8 px-10 shadow-md rounded-xl max-h-[95vh] overflow-y-auto overflow-x-hidden">
        <Outlet context={{ token }} />
      </div>
    </div>
  );
}

export function useMagicToken() {
  return useOutletContext<ContextType>();
}