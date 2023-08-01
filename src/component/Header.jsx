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
          <Link to="/admin/coworkings">All coworkings</Link>
        </li>
        <li>
          <Link to="/admin/coworking/create">Add Coworking</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
