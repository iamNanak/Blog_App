import React from "react";
import { Logo, Logoutbtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

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
      <nav className="flex flex-wrap items-center justify-around md:justify-between mx-auto w-full px-4 py-2 ">
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="flex items-center justify-between">
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
    </header>
  );
}

export default Header;
