import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../../component/admin/HeaderAdmin";

const AllReviews = () => {
  const jwt = Cookies.get("jwt");
  const [review, setReview] = useState([]);

  const allReviews = async () => {
    const responseApi = await fetch("http://localhost:3010/api/comment/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const responseJson = await responseApi.json();
    setReview(responseJson.data);
  };
  useEffect(() => {
    allReviews();
  }, []);

  return (
    <>
      <Header />
      <h1>Tout les commentaires</h1>
      {review.length !== 0 &&
        review.map((element) => {
          return (
            <>
              <p>{element.content}</p>
              <p>{element.rating}</p>
            </>
          );
        })}
    </>
  );
};

export default AllReviews;
