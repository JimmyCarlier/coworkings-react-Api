import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();

  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const handleClick = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };

  return (
    <header>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <span class="material-symbols-outlined">home</span>
          </Link>
        </li>
        <li>
          <img src="user.jpg" alt="" />
        </li>
        <li>
          <Link to="/admin/coworkings">All coworkings</Link>
        </li>
        <li>
          <Link to="/admin/coworking/create">Add Coworking</Link>
        </li>
        <li>
          <div className="user-name">
            Connecté en tant que {user.data.Username}
          </div>
          <span class="material-symbols-outlined" onClick={handleClick}>
            logout
          </span>
        </li>
      </ul>
    </header>
  );
};
export default Header;
