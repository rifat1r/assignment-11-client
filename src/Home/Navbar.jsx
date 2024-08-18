import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { MdMenu } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  console.log(user?.displayName, user?.email, "user");

  const handleLogout = () => {
    logoutUser().then().catch();
  };

  const centerLinks = (
    <nav className="flex border border-orange-400 px-5 py-2 rounded-badge space-x-4 text-base font-medium opacity-80">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/rooms">Rooms</NavLink>
      <NavLink to="/myBookings">My Bookings</NavLink>
    </nav>
  );

  const smLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/rooms">Rooms</NavLink>
      </li>
      <li>
        <NavLink to="/myBookings">My Bookings</NavLink>
      </li>
    </>
  );

  const leftLinks = (
    <>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      {user ? (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      <hr />
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost btn-outline text-xl">BookNest</a>
      </div>
      <div className="navbar-center hidden sm:block">{centerLinks}</div>

      <div className="navbar-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="">
            <div className="flex items-center gap-1 border rounded-full px-3 py-1 my-auto shadow-md hover:shadow-inner">
              <span className="text-3xl">
                <MdMenu />
              </span>
              <div className="w-8">
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://i.postimg.cc/1tmgvBcN/453178253-471506465671661-2781666950760530985-n.png"
                  }
                  onError={(e) => {
                    e.target.src =
                      "https://i.postimg.cc/1tmgvBcN/453178253-471506465671661-2781666950760530985-n.png";
                  }}
                />
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 z-[2] mr-11 w-28 shadow"
          >
            <div className="block md:hidden">{smLinks}</div>{" "}
            <div className="hidden md:block">{leftLinks}</div>{" "}
            <div className="block md:hidden">{leftLinks}</div>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
