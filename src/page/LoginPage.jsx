import Cookies from "js-cookie";
const LoginPage = () => {
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
    Cookies.set("login", repsonseJson.data);
  };

  return (
    <>
      <form onSubmit={handleSubmitLogin} className="form-login">
        <div>
          <label htmlFor="name">username :</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="password">password :</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginPage;
