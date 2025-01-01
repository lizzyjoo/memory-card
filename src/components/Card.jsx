import PropTypes from "prop-types";

// receive image & data as props from APP
function Card({ image, name }) {
  return (
    <div className>
      <img className="pokemonImage" src={image}></img>
      <p className="pokemonName">{name.toUpperCase()}</p>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Card;
