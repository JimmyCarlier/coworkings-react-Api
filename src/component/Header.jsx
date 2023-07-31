import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">
            <span class="material-symbols-outlined">home</span>
          </Link>
        </li>
        <li>
          <img src="user.jpg" alt="" />
        </li>
        <li>
          <Link to="/coworkings">All coworkings</Link>
        </li>
        <li></li>
      </ul>
    </header>
  );
};
export default Header;
