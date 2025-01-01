import PropTypes from "prop-types";

function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreBoard">
      <div>Current Score: {currentScore}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}

Scoreboard.propTypes = {
  currentScore: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};
export default Scoreboard;
