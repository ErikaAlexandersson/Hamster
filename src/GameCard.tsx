import { useEffect, useState } from "react";
import { Hamster, Matches } from "./Interfaces";

interface Prop {
  data: Hamster;
}

function GameCard({ data }: Prop) {
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState(null);

  useEffect(() => {
    async function getWinner() {
      const response: Response = await fetch(
        `http://localhost:1337/hamsters/${data.winnerId}`
      );
      const winner: Promise<Matches> = await response.json();
    }
    setWinner(winner);
    getWinner();
  }, []);

  return (
    <div className="game-card">{winner ? <p>{winner.name}</p> : null}</div>
  );
}

export default GameCard;
