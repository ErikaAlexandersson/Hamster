import { useEffect, useState } from "react";
import { Hamster, Matches } from "./Interfaces";
import fixUrl from "./utils";
import "./GameCard.css";

interface Prop {
  data: Matches;
  index: number;
}

function GameCard({ data, index }: Prop) {
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);
  // TODO: Fixa så att APIet kan ta imot annat än hamster
  useEffect(() => {
    async function getWinner() {
      const response: Response = await fetch(
        fixUrl(`/hamsters/${data.winnerId}`)
      );
      const winningHamster: Hamster = await response.json();
      console.log(data.winnerId);
      setWinner(winningHamster);
    }
    async function getLooser() {
      const response: Response = await fetch(
        fixUrl(`/hamsters/${data.loserId}`)
      );
      const losingHamster: Hamster = await response.json();
      setLoser(losingHamster);
    }
    getWinner();
    getLooser();
  }, []);

  let milliseconds = data.time;
  let date = new Date(milliseconds);
  let sweDate = date.toLocaleString();

  return (
    <div className="game-card">
      <p className="game-number">{sweDate}</p>
      {winner ? (
        <div className="winners">
          <p>{winner.name}</p>
          <div className="img-container">
            <img src={fixUrl(`/img/${winner.imgName}`)} alt="" />
          </div>
        </div>
      ) : null}
      {loser ? (
        <div className="losers">
          <p>{loser.name}</p>
          <div className="img-container">
            <img src={fixUrl(`/img/${loser.imgName}`)} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GameCard;
