import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function RegContainer() {
  useEffect(() => {
    // 重新组织url
    location.href = `${location.origin}${location.hash}${location.search}`;
  }, [location]);

  return (
    <div className="flex-center h-screen overflow-x-hidden overflow-y-auto dark:bg-gray-700">
      <div className="py-8 px-10 shadow-md rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
