import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
 
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="p-2 bg-[#f0f2f5] rounded-full w-fit">
        <BellIcon className="w-5 h-5"/>
      </div>
      <Avatar src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698624000&semt=ais" size="sm"/>
    </ul>
  );
}
 
function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="w-full max-w-none px-4 py-3 rounded-none">
      <div className="flex items-center justify-between text-blue-gray-900 w-full">
        <div className="bg-[#f0f2f5] min-w-[40%] h-full flex justify-start items-center px-2">
          <MagnifyingGlassIcon className="h-5 w-5"/>
          <input className="border-none outline-none focus:ring-0 p-2 w-full bg-[#f0f2f5] text-sm"
           placeholder="Search here..."
          />
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default NavbarSimple;