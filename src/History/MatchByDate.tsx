import { Hamster, Matches } from "../Interfaces";
import GameCard from "./GameCard";
import "./MatchByDate.css";
import { useState } from "react";

interface Games {
  data: Matches[];
}

function MatchByDate({ data }: Games) {
  const [showOrHide, setShowOrHide] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

  const shortList = data?.slice(start, end);

  function getNextTen() {
    setStart(start);
    setEnd(end + 10);
  }

  return (
    <div className="games-container">
      <div className="holder-of-the-header">
        {data[0] !== undefined ? (
          <div className="header-container">
            <h1 onClick={() => setShowOrHide(!showOrHide)}>{data[0].date}</h1>
          </div>
        ) : null}
      </div>
      {showOrHide ? <p>Tryck på datumet för att stänga fliken</p> : null}
      {showOrHide ? (
        <div className="holder-of-the-cards">
          <div className="score-container">
            <h2>Vinnare</h2>
            <h2>Förlorare</h2>
          </div>
          <div className="game-cards">
            {shortList.map((matches) => (
              <GameCard data={matches} key={matches.id} />
            ))}
          </div>
          <button onClick={() => getNextTen()}>
            <span className="button_top">Hämta fler...</span>
          </button>
          <button onClick={() => setShowOrHide(!showOrHide)}>
            <span className="button_top">Stäng denna fliken</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default MatchByDate;
