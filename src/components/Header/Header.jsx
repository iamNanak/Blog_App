import React from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
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
    {
      name: "Logout",
      slug: "/login",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 shadow-lg bg-gray-800 text-white npw-full h-full">
      <nav className="flex items-center justify-between mx-auto ">
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        <ul className="flex items-center ">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className={`inline-block px-5 py-2 font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition ${
                    location.pathname === item.slug ? "bg-gray-700" : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {/* {authStatus && (

            )} */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
