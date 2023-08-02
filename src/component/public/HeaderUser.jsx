import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
const HeaderUser = () => {
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
        <li className="log">
          <img src="user.jpg" alt="" />
          <div className="user-name">
            Connecté en tant que {user.data.Username}
          </div>
        </li>
        <li>
          <Link to="/public/coworkings">Tout les coworkings</Link>
        </li>
        <li>Ajouter un coworking</li>
        <li></li>
        <li className="logout">
          <span class="material-symbols-outlined" onClick={handleClick}>
            logout
          </span>
          Se déconnecter
        </li>
      </ul>
    </header>
  );
};

export default HeaderUser;
