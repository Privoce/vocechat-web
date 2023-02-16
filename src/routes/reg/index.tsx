import { Outlet } from "react-router-dom";

export default function RegContainer() {
  return (
    <div className="flex-center h-screen dark:bg-gray-700">
      <div className="py-8 px-10 shadow-md rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
