import { FC, PropsWithChildren, ReactNode } from "react";
import { useLocation, NavLink } from "react-router-dom";
import IconBack from "../../assets/icons/arrow.left.svg";
import { Nav } from "../../routes/settingChannel/navs";
import clsx from "clsx";
export interface Danger {
  title: string;
  handler: () => void;
}

interface Props {
  closeModal: () => void;
  title?: string;
  navs: Nav[];
  dangers: [Danger | boolean];
  nav: { title: string; name?: string; component?: ReactNode };
}

const StyledSettingContainer: FC<PropsWithChildren<Props>> = ({
  closeModal,
  title = "Settings",
  navs = [],
  dangers = [],
  nav,
  children
}) => {
  const { pathname } = useLocation();
  return (
    <div className="w-screen h-screen flex">
      <div className="h-screen min-w-[120px] md:min-w-[212px] overflow-scroll px-4 py-8 bg-[#f5f6f7] dark:bg-[#1F2A37]">
        <h2 onClick={closeModal} className="flex gap-2 items-center text-sm md:text-base cursor-pointer mb-8 font-bold text-gray-800 dark:text-white">
          <IconBack className="dark:fill-gray-400" /> {title}
        </h2>
        {navs.map(({ title, items }) => {
          return (
            <ul key={title} data-title={title} className="flex flex-col gap-0.5 mb-9 before:md:pl-3 before:content-[attr(data-title)] before:font-bold before:text-xs before:text-gray-400">
              {items.map(({ name, title }) => {
                return (
                  <li key={name} className={clsx(`text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap dark:text-gray-200  rounded hover:bg-[#e7e5e4] dark:hover:bg-slate-500/20`, name == nav?.name && "bg-[#e7e5e4] dark:bg-slate-500/20")}>
                    <NavLink to={`${pathname}?nav=${name}`} className="block md:px-3 py-1">{title}</NavLink>
                  </li>
                );
              })}
            </ul>
          );
        })}
        {dangers.length ? (
          <ul className="flex flex-col gap-2 mb-9 text-xs md:text-sm font-semibold text-red-500 dark:text-red-400">
            {dangers.map((d) => {
              if (typeof d === "boolean" || !d) return null;
              const { title, handler } = d;
              return (
                <li key={title} onClick={handler} className="rounded cursor-pointer py-1.5 md:px-3">
                  {title}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className="bg-white w-full max-h-full overflow-auto p-8 dark:bg-[#384250]">
        {nav && <h4 className="font-bold text-xl text-gray-600 mb-8 dark:text-gray-100">{nav.title}</h4>}
        {children}
      </div>
    </div>
  );
};

export default StyledSettingContainer;
