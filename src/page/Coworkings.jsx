import { useEffect, useState } from "react";
import ModelCoworking from "../component/ModelCoworking";
import Header from "../component/Header";

const Coworkings = () => {
  const [allCoworkings, setAllCoworkings] = useState([]);
  const [deleteMessageApi, setDeleteMessageApi] = useState(null);

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

  return (
    <>
      <Header />
      {deleteMessageApi && <p>{deleteMessageApi}</p>}
      {!allCoworkings ? (
        <h1>Loading...</h1>
      ) : (
        <section className="grid-coworking">
          {allCoworkings.map((coworking) => {
            return (
              <>
                <ModelCoworking coworking={coworking} />
                <button onClick={() => handleDeleteCoworking(coworking.id)}>
                  Supprimer ce coworking
                </button>
              </>
            );
          })}
        </section>
      )}
    </>
  );
};
export default Coworkings;
