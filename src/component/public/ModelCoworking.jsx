const ModelCoworking = ({ coworking }) => {
  return (
    <article className="all-coworkings">
      <h1>{coworking.name}</h1>
      <ul className="coworking">
        <li>{coworking.address.number}</li>
        <li>{coworking.address.street}</li>
        <li>{coworking.address.postCode}</li>
      </ul>
    </article>
  );
};

export default ModelCoworking;
