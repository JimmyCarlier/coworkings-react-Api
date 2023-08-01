import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Header from "../component/Header";

const UpdateCoworkingPage = () => {
  const { id } = useParams();
  const [updateCoworking, setUpdateCoworking] = useState(null);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [indexTime, setIndexTime] = useState(5);

  const fetchUpdateApi = async () => {
    const response = await fetch(`http://localhost:3010/api/coworkings/${id}`);
    const responseJson = await response.json();

    setUpdateCoworking(responseJson.data);
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const priceHour = event.target.price_hour.value;
    const priceDay = event.target.price_day.value;
    const priceMonth = event.target.price_month.value;
    const addressNumber = event.target.address_number.value;
    const addressStreet = event.target.address_street.value;
    const adressPostCode = event.target.address_postCode.value;
    const adressCity = event.target.address_city.value;
    const superficy = event.target.superficy.value;
    const capacity = event.target.capacity.value;

    const submitData = {
      name: name,
      price: {
        hour: parseInt(priceHour),
        day: parseInt(priceDay),
        month: parseInt(priceMonth),
      },
      address: {
        number: parseInt(addressNumber),
        street: addressStreet,
        postCode: parseInt(adressPostCode),
        city: adressCity,
      },
      superficy: parseInt(superficy),
      capacity: parseInt(capacity),
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    };

    const response = await fetch(
      `http://localhost:3010/api/coworkings/${id}`,
      requestOptions
    );

    setInterval(() => {
      setIndexTime((indexTime) => indexTime - 1);
    }, 1000);

    setIsUpdate(true);

    setTimeout(() => {
      navigate("/coworkings");
    }, 5000);
  };
  useEffect(() => {
    fetchUpdateApi();
  }, [updateCoworking]);

  return (
    <>
      <Header />
      {isUpdate && (
        <h2 className="confirm-message">
          Le coworking à bien était modifié, redirections vers les coworkings
          dans : {indexTime} secondes
        </h2>
      )}
      <form className="form-coworking" onSubmit={handleSubmitUpdate}>
        <label htmlFor="name">Nom du Coworking</label>
        <input
          type="text"
          name="name"
          defaultValue={updateCoworking && updateCoworking.name}
        />

        <label htmlFor="price_hour">Prix à l'heure</label>
        <input
          type="number"
          name="price_hour"
          defaultValue={updateCoworking && updateCoworking.price.hour}
        />

        <label htmlFor="price_day">Prix au jour</label>
        <input
          type="number"
          name="price_day"
          defaultValue={updateCoworking && updateCoworking.price.day}
        />

        <label htmlFor="price_month">Prix au mois</label>
        <input
          type="number"
          name="price_month"
          defaultValue={updateCoworking && updateCoworking.price.month}
        />

        <label htmlFor="address_number">Numéro d'addresse</label>
        <input
          type="number"
          name="address_number"
          defaultValue={updateCoworking && updateCoworking.address.number}
        />

        <label htmlFor="address_street">Rue :</label>
        <input
          type="text"
          name="address_street"
          defaultValue={updateCoworking && updateCoworking.address.street}
        />

        <label htmlFor="address_postCode">Code postale :</label>
        <input
          type="number"
          name="address_postCode"
          defaultValue={updateCoworking && updateCoworking.address.postCode}
        />

        <label htmlFor="address_city">Ville :</label>
        <input
          type="text"
          name="address_city"
          defaultValue={updateCoworking && updateCoworking.address.city}
        />

        <label htmlFor="superficy">Superficie</label>
        <input
          type="number"
          name="superficy"
          defaultValue={updateCoworking && updateCoworking.superficy}
        />

        <label htmlFor="capacity">Capacité :</label>
        <input
          type="number"
          name="capacity"
          defaultValue={updateCoworking && updateCoworking.capacity}
        />

        <input type="submit" value="Modifier mon coworking" />
      </form>
    </>
  );
};

export default UpdateCoworkingPage;
