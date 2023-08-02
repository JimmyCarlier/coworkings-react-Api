import { useParams } from "react-router";
import HeaderUser from "../../component/public/HeaderUser";
import { useEffect, useState } from "react";

const CreateReview = () => {
  const [singleCoworking, setSingleCoworking] = useState();
  const { id } = useParams();

  const searchCoworkingById = async () => {
    const resultCoworking = await fetch(
      `http://localhost:3010/api/coworkings/${id}`
    );
    const resultJson = await resultCoworking.json();
    setSingleCoworking(resultJson.data);
  };
  useEffect(() => {
    searchCoworkingById();
  }, []);

  return (
    <>
      <HeaderUser />
      <h1>{singleCoworking && singleCoworking.name}</h1>
      <ul>
        <li>{singleCoworking && singleCoworking.address.number}</li>
        <li>{singleCoworking && singleCoworking.address.street}</li>
        <li>{singleCoworking && singleCoworking.address.postcode}</li>
      </ul>
      <form>
        <label htmlFor="comment">Commentaire :</label>
        <input type="text" name="comment" />

        <label htmlFor="rate">Note :</label>
        <input type="number" name="rate" />

        <input type="submit" value="Envoyer mon commentaire" />
      </form>
    </>
  );
};

export default CreateReview;
