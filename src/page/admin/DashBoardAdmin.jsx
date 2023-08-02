import { useNavigate } from "react-router";
import Header from "../../component/admin/HeaderAdmin";
import Cookies from "js-cookie";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { CheckRoles } from "../../component/admin/CheckRoles";

const DashBoardAdmin = () => {
  const navigate = useNavigate();
  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  useEffect(() => {
    (async () => {
      const role = await CheckRoles();

      console.log(role);
      if (role !== 1) {
        navigate("/");
      }
      if (!Cookies.get("jwt")) {
        navigate("/login");
      }
    })();
  }, []);

  return (
    <section className="dashboard">
      <Header />
      <h1>Bienvenue Ô grand {user.data.Username} kwakouBg</h1>
    </section>
  );
};

export default DashBoardAdmin;
