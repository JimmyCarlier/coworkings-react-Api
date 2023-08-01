import { useEffect, useState } from "react";
import ModelCoworking from "../component/ModelCoworking";
import Header from "../component/Header";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const Coworkings = () => {
  const [allCoworkings, setAllCoworkings] = useState([]);
  const [deleteMessageApi, setDeleteMessageApi] = useState(null);
  const [idDeleteMessage, setIdDeleteMessage] = useState([]);

  const fetchCoworkingsApi = async () => {
    const responseApi = await fetch("http://localhost:3010/api/coworkings/");
    const responseJson = await responseApi.json();
    setAllCoworkings(responseJson);
  };

  useEffect(() => {
    fetchCoworkingsApi();
  }, [deleteMessageApi]);

  const handleDeleteCoworking = async (coworkingId) => {
    const fetchApiDelete = await fetch(
      `http://localhost:3010/api/coworkings/${coworkingId}`,
      {
        method: "DELETE",
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
                  to={`/coworking/${coworking.id}/update`}
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
