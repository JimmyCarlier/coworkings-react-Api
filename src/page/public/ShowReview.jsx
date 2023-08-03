import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import HeaderUser from "../../component/public/HeaderUser";

const ShowReview = () => {
  const { id } = useParams();
  const token = Cookies.get("jwt");
  const [review, setReview] = useState([]);
  const [coworking, setCoworking] = useState(null);
  const navigate = useNavigate();

  const apiParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const reviewForSingleCoworking = async () => {
    if (!token) {
      navigate(`/login?tokenExpired`);
    }
    const responseCoworking = await fetch(
      `http://localhost:3010/api/coworkings/${id}`,
      apiParams
    );
    const coworkingJson = await responseCoworking.json();
    setCoworking(coworkingJson.data);

    const responseApi = await fetch(
      `http://localhost:3010/api/comment/${id}`,
      apiParams
    );
    const responseJson = await responseApi.json();
    setReview(responseJson.data);
    console.log(responseJson.data);
  };
  useEffect(() => {
    reviewForSingleCoworking();
  }, []);

  return (
    <>
      <HeaderUser />
      <section className="review-section">
        {coworking && (
          <>
            <h1>Nom du coworking : {coworking.name}</h1>
            <p>
              {" "}
              Adresse :{coworking.address.number} {coworking.address.street},{" "}
              {coworking.address.postCode} {coworking.address.city}
            </p>
            <p>Capacité de reception :{coworking.capacity}</p>
            <p>Superficie :{coworking.superficy}</p>
            <ul>
              <li>Prix au jour :{coworking.price.day}</li>
              <li>Prix à l'heure :{coworking.price.hour}</li>
              <li>Prix au mois :{coworking.price.month}</li>
            </ul>
          </>
        )}
        {}
        {review.length !== 0 &&
          review.map((test) => {
            return (
              <div className="review">
                <h2>{test.user.name}</h2>
                <p>Commentaire : {test.content}</p>
                <p>Note :{test.rating}</p>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default ShowReview;
