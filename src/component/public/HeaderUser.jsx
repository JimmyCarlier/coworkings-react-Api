import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
const HeaderUser = () => {
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  let user = null;

  useEffect(() => {
    const jwt = Cookies.get("jwt");

    if (!jwt) {
      navigate("/");
    } else {
      user = jwtDecode(jwt);
    }
    setTest(user);
  }, []);

  const handleClick = () => {
    Cookies.remove("jwt");
    navigate("/");
  };
  const connectUser = () => {
    navigate("/login");
  };

  return (
    <header>
      <ul>
        <li className="log">
          <img src="user.jpg" alt="" />
          {test && (
            <div className="user-name">
              Connecté en tant que {test.data.Username}
            </div>
          )}
        </li>
        <li>
          <Link to="/public/coworkings">Tout les coworkings</Link>
        </li>
        <li>Ajouter un coworking</li>
        <li></li>
        {test ? (
          <li className="logout">
            <span class="material-symbols-outlined" onClick={handleClick}>
              logout
            </span>
            Se déconnecter
          </li>
        ) : (
          <li onClick={connectUser}>Connexion</li>
        )}
      </ul>
    </header>
  );
};

export default HeaderUser;
