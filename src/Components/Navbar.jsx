import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `bg-[#AA8453]` : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) => (isActive ? `bg-[#AA8453]` : "")}
        >
          Rooms
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-transparent container mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">Galaxy Luxury Hotel</div>
            <div className="flex-none hidden lg:block">
              <ul className="flex gap-5">
                {/* Navbar menu content here */}
                {navItems}
              </ul>
            </div>
            <div className="navbar-end">
              <NavLink className="btn">Login</NavLink>
            </div>
          </div>

          {/* Page content here */}
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className=" p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {navItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
