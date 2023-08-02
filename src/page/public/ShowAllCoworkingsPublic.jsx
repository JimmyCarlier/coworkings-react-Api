import { useEffect, useState } from "react";
import HeaderUser from "../../component/public/HeaderUser";
import ModelCoworking from "../../component/public/ModelCoworking";
import { Link } from "react-router-dom";

const ShowallCoworkingsPublic = () => {
  const [allCoworkings, setAllCoworkings] = useState([]);

  const fetchCoworkingsApi = async () => {
    const responseApi = await fetch("http://localhost:3010/api/coworkings/");
    const responseJson = await responseApi.json();
    setAllCoworkings(responseJson);
  };
  useEffect(() => {
    fetchCoworkingsApi();
  });

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
            <button>Voir les commentaires</button>
          </>
        );
      })}
    </>
  );
};

export default ShowallCoworkingsPublic;
