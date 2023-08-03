import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CheckRoles } from "../../component/admin/CheckRoles";

const LoginPage = () => {
  const navigate = useNavigate();
  const [timeLog, setTimeLog] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [querryParam] = useSearchParams();
  const session = querryParam.get("tokenExpired");
  console.log(session);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const password = event.target.password.value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    };

    const responseLogin = await fetch(
      "http://localhost:3010/api/user/login",
      requestOptions
    );
    const repsonseJson = await responseLogin.json();

    if (responseLogin.status === 200) {
      Cookies.set("jwt", repsonseJson.data, { expires: 0.041 });

      const role = await CheckRoles();

      if (role === 1) {
        setTimeLog(true);

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      } else {
        setIsUser(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } else {
      setWrongUser(true);
      setTimeout(() => {
        setWrongUser(false);
      }, 3000);
    }
  };

  return (
    <section className="form-admin">
      {session && <h1>La session a expiré</h1>}
      {isUser && (
        <div className="pop-up-admin">
          <h2>Vous êtes bien connecté en tant qu'utilisateur</h2>
        </div>
      )}
      {wrongUser && (
        <div className="container">
          <div className="pop-up-wrong">
            <h2>L'utilisateur ou le mot de passe est invalide</h2>
          </div>
        </div>
      )}
      {timeLog && (
        <div className="pop-up-admin">
          <h2>Vous êtes bien connecté en tant qu'Administrateur</h2>
        </div>
      )}
      <div className="header-admin">
        <h1>Connection</h1>
        <img src="user.jpg" alt="" />
      </div>
      <form onSubmit={handleSubmitLogin} className="form-login">
        <div className="username-log">
          <label htmlFor="name">username :</label>
          <input type="text" name="name" />
        </div>
        <div className="password-log">
          <label htmlFor="password">password :</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" className="btn-connect" />
      </form>
    </section>
  );
};

export default LoginPage;
