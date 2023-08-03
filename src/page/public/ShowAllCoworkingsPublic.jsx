import { useEffect, useState } from "react";
import HeaderUser from "../../component/public/HeaderUser";
import ModelCoworking from "../../component/public/ModelCoworking";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const ShowallCoworkingsPublic = () => {
  const [allCoworkings, setAllCoworkings] = useState([]);
  const navigate = useNavigate();

  const fetchCoworkingsApi = async () => {
    const responseApi = await fetch("http://localhost:3010/api/coworkings/");
    const responseJson = await responseApi.json();
    setAllCoworkings(responseJson);
  };
  useEffect(() => {
    fetchCoworkingsApi();
    (async () => {
      if (!Cookies.get("jwt")) {
        navigate("/login");
      }
    })();
  }, []);

  return (
    <>
      <HeaderUser />
      {allCoworkings.map((coworking) => {
        return (
          <>
            <ModelCoworking coworking={coworking} />
            <Link to={`/public/create/review/${coworking.id}`}>
              <button>Ajouter un commentaire</button>
            </Link>
            <Link to={`/public/coworking/review/${coworking.id}`}>
              <button>Voir les commentaires</button>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default ShowallCoworkingsPublic;
