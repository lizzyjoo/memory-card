import { useEffect, useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";
import Pokeball from "./assets/pokeball.svg";

// will handle API fetching and also game state maintenance (best score, current score)
function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleCardClick = (cardID) => {
    // if the user clicks an already clicked card, reset
    if (clickedCards.includes(cardID)) {
      console.log("clicked cards array:", JSON.stringify(clickedCards));
      setCurrScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, cardID]);
      console.log("clicked cards array:", JSON.stringify(clickedCards));
      const newScore = currScore + 1;
      setCurrScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    // shuffling of cards, then need to update
    setCards(shuffleCards(cards));
  };

  const shuffleCards = (array) => {
    // Create a copy of the array to avoid mutating the original
    const newArray = [...array];
    // Start from the last element and swap one by one
    for (let i = newArray.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const numCards = 12;
    // asynchronous function to handle Pokemon fetching
    const fetchPokemon = async () => {
      try {
        // create url array
        const pokemonUrls = [];
        const totalCards = 541;
        for (let i = 1; i <= numCards; i++) {
          // there are 541 cards in the API, needs change is it updates
          const randomNumber = Math.floor(Math.random() * (totalCards - 1) + 1);
          pokemonUrls.push(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
        }

        const responses = await Promise.all(
          pokemonUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        const pokemonData = responses.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));
        setCards(pokemonData);
      } catch (error) {
        console.error("error fetching pokemon", error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <img src={Pokeball} alt="Pokemon Logo" className="pokeball" />
          Pokémon Memory Card
        </div>
        <Scoreboard currentScore={currScore} bestScore={bestScore}></Scoreboard>
      </div>
      <div className="content">
        <div className="cardContainer">
          {cards.map((card) => (
            <div
              key={card.id}
              className="cardDiv"
              onClick={() => handleCardClick(card.id)}
            >
              <Card image={card.image} name={card.name}></Card>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="hover-point"></div>
              <div className="box-contents"></div>
            </div>
          ))}
        </div>
      </div>
      {/* <img src={Pikachu} alt="Pikachu" className="pikachu" /> */}
    </div>
  );
}

export default App;
