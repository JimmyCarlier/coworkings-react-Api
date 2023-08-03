import { useNavigate, useParams } from "react-router";
import HeaderUser from "../../component/public/HeaderUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CreateReview = () => {
  const [singleCoworking, setSingleCoworking] = useState();
  const [isValid, setIsValid] = useState(false);
  const { id } = useParams();
  const token = Cookies.get("jwt");
  const navigate = useNavigate();

  const searchCoworkingById = async () => {
    const resultCoworking = await fetch(
      `http://localhost:3010/api/coworkings/${id}`
    );
    const resultJson = await resultCoworking.json();
    setSingleCoworking(resultJson.data);
    console.log(resultJson);
  };

  const handleCreateReview = async (event) => {
    event.preventDefault();

    const content = event.target.comment.value;
    const rating = event.target.rate.value;
    if (rating > 5 || rating < 0) {
      return setIsValid(true);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, rating }),
    };
    const responseApiReview = await fetch(
      `http://localhost:3010/api/comment/${id})`,
      requestOptions
    );
    const responseJson = await responseApiReview.json();
    navigate("/public/coworkings");
  };
  useEffect(() => {
    searchCoworkingById();
  }, []);

  return (
    <>
      <HeaderUser />
      {
        <section className="add-review">
          <h1>{singleCoworking && singleCoworking.name}</h1>
          <ul>
            <li>{singleCoworking && singleCoworking.address.number}</li>
            <li>{singleCoworking && singleCoworking.address.street}</li>
            <li>{singleCoworking && singleCoworking.address.postcode}</li>
          </ul>
          <form onSubmit={handleCreateReview} className="form-review">
            <div className="col textarea">
              <label htmlFor="comment">Commentaire :</label>
              <textarea name="comment" id="" cols="30" rows="5"></textarea>
            </div>
            <div className="col rate">
              {isValid && <p>La valeur doit être comprise entre 0 et 5</p>}
              <label htmlFor="rate">Note :</label>
              <input type="number" name="rate" />
            </div>
            <input
              type="submit"
              value="Envoyer mon commentaire"
              className="submit-review"
            />
          </form>
        </section>
      }
    </>
  );
};

export default CreateReview;
