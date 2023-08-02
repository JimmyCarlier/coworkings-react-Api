import { useEffect, useState } from "react";
import ModelCoworking from "../../component/public/ModelCoworking";
import Header from "../../component/admin/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { CheckRoles } from "../../component/admin/CheckRoles";

const Coworkings = () => {
  const navigate = useNavigate();
  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt);

  const [allCoworkings, setAllCoworkings] = useState([]);
  const [deleteMessageApi, setDeleteMessageApi] = useState(null);
  const [idDeleteMessage, setIdDeleteMessage] = useState([]);
  const Navigate = useNavigate();

  const fetchCoworkingsApi = async () => {
    const responseApi = await fetch("http://localhost:3010/api/coworkings/");
    const responseJson = await responseApi.json();
    setAllCoworkings(responseJson);
  };

  useEffect(() => {
    (async () => {
      const role = await CheckRoles();
      if (role != 1) {
        navigate("/");
      }
      fetchCoworkingsApi();
      if (!Cookies.get("jwt")) {
        Navigate("/login");
      }
    })();
  }, [deleteMessageApi]);

  const handleDeleteCoworking = async (coworkingId) => {
    const token = Cookies.get("jwt");

    const fetchApiDelete = await fetch(
      `http://localhost:3010/api/coworkings/${coworkingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonApiDelete = await fetchApiDelete.json();

    setDeleteMessageApi(jsonApiDelete.message);
  };

  const deleteMessage = (coworking) => {
    setIdDeleteMessage(coworking);
  };
  return (
    <>
      <Header />
      {deleteMessageApi && <p className="delete-message">{deleteMessageApi}</p>}
      {allCoworkings.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <section className="grid-coworking">
          {allCoworkings.map((coworking) => {
            return (
              <>
                <ModelCoworking coworking={coworking} />
                <button
                  onClick={() => deleteMessage(coworking.id)}
                  className="fake-delete-btn"
                >
                  Supprimer ce coworking
                </button>

                {idDeleteMessage === coworking.id && (
                  <div className="delete-msg">
                    <p>Êtes vous sur de vouloir supprimer ce coworking ?</p>
                    <button
                      onClick={() => handleDeleteCoworking(coworking.id)}
                      className="delete-btn"
                    >
                      Supprimer ce coworking
                    </button>
                  </div>
                )}
                <Link
                  to={`/admin/coworking/${coworking.id}/update`}
                  className="update-btn"
                >
                  Update
                </Link>
              </>
            );
          })}
        </section>
      )}
    </>
  );
};
export default Coworkings;
