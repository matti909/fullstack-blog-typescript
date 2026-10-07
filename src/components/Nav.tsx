import { Link } from "@tanstack/react-router";
import "./nav.css";

export const Nav = () => {
  return (
    <nav className="topnav">
      <div className="topnav-left">
        <Link to="/" className="topnav-logo">
          blog
        </Link>
      </div>
      <div className="topnav-center">
        <Link to="/">Posts</Link>
        <Link to="/fetch_post">Post</Link>
      </div>
      <div className="topnav-right">
        <Link to="/login">Sign in</Link>
        <Link to="/signup" className="topnav-signup">
          Sign up
        </Link>
      </div>
    </nav>
  );
};
