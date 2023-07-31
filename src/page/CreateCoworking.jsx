import Header from "../component/Header";
import { useNavigate } from "react-router-dom";

const CreateCoworking = () => {
  const navigate = useNavigate();
  const handleCreateCoworking = async (event) => {
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    };
    console.log(submitData);
    const fetchCreateApi = await fetch(
      "http://localhost:3010/api/coworkings/",
      requestOptions
    );
    const coworkingCreateJson = fetchCreateApi.json();

    navigate("/coworkings");
  };
  return (
    <>
      <Header />
      <form onSubmit={handleCreateCoworking}>
        <label htmlFor="name">Nom du Coworking</label>
        <input type="text" name="name" />

        <label htmlFor="price_hour">Prix à l'heure</label>
        <input type="number" name="price_hour" />

        <label htmlFor="price_day">Prix au jour</label>
        <input type="number" name="price_day" />

        <label htmlFor="price_month">Prix au mois</label>
        <input type="number" name="price_month" />

        <label htmlFor="address_number">Numéro d'addresse</label>
        <input type="number" name="address_number" />

        <label htmlFor="address_street">Rue :</label>
        <input type="text" name="address_street" />

        <label htmlFor="address_postCode">Code postale :</label>
        <input type="number" name="address_postCode" />

        <label htmlFor="address_city">Ville :</label>
        <input type="text" name="address_city" />

        <label htmlFor="superficy">Superficie</label>
        <input type="number" name="superficy" />

        <label htmlFor="capacity">Capacité :</label>
        <input type="number" name="capacity" />

        <input type="submit" value="Créer mon coworking" />
      </form>
    </>
  );
};

export default CreateCoworking;
