import React, { useState } from "react";
import { Logoutbtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
// import LordIcon from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 shadow-lg bg-gray-800 text-white w-full h-full px-2">
      <nav className="flex items-center justify-between md:justify-between mx-auto w-full px-4 py-2 ">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className=" flex text-4xl text-bold text-center text-white font-bold"
          >
            Blogger
            <lord-icon
              src="https://cdn.lordicon.com/rwtswsap.json"
              trigger="hover"
              colors="primary:#fffff"
              speed="0.25"
              style={{ width: "45px", height: "45px" }}
            ></lord-icon>
          </Link>
        </div>
        <ul className="hidden md:flex items-center justify-between">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className={`px-5 py-2 font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition ${
                    location.pathname === item.slug ? "bg-gray-700" : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <Logoutbtn />
            </li>
          )}
        </ul>

        <div onClick={toggleNav} className="md:hidden z-30 end-6">
          {nav ? <FaRegWindowClose size={20} /> : <HiMenuAlt3 size={30} />}
        </div>
        <nav
          className={
            nav
              ? "text-center z-20 fixed h-full w-full left-0 top-0 bg-slate-700 bg-opacity-75 md:hidden flex justify-center place-items-center"
              : "fixed left-[-100%]"
          }
        >
          <ul className="flex flex-col items-center justify-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-5 py-2 font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition ${
                      location.pathname === item.slug ? "bg-gray-700" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </nav>
    </header>
  );
}

export default Header;
