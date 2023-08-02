import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const CheckRoles = async () => {
  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const isUser = await fetch(
    `http://localhost:3010/api/user/${user.data.userId}`
  );

  const isUserjson = await isUser.json();
  const role = isUserjson.data.roles;

  return role;
};
