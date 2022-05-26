import { useEffect, useState } from "react";
import { Hamster, Matches } from "./Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import fixUrl from "./utils";
import { fixImgUrl } from "./utils";
import { reRenderHamster } from "./state/features/reRenderSlice";
import "./GameCard.css";
import { addMatches } from "./state/features/matchesSlice";

interface Prop {
  data: Matches;
}

function GameCard({ data }: Prop) {
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const matchArray = useSelector((state: RootState) => state.matches.value);
  // TODO: Fixa så att APIet kan ta imot annat än hamster
  useEffect(() => {
    async function getWinner() {
      const response: Response = await fetch(
        fixUrl(`/hamsters/${data.winnerId}`)
      );
      const winningHamster: Hamster = await response.json();
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
  let sweDate = date.toLocaleDateString();
  let sweTime = date.toLocaleTimeString();

  const weekday = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];

  let day = weekday[date.getDay()];

  const dispatch = useDispatch();

  function deleteGame(e: any) {
    console.log(e.target.id);
    fetch(fixUrl(`/hamsters/${e.target.id}`), {
      method: "DELETE",
    });
    const filtredArray = matchArray.filter((match) => {
      if (match.id === e.target.id) {
        console.log("yes");
      }
      let mabyTheOne = match.id !== e.target.id;
      return match.id !== e.target.id;
    });
    console.log(filtredArray);
    // dispatch(reRenderHamster(!reRenderData));
    dispatch(addMatches(filtredArray));
  }

  return (
    <div className="game-card">
      <p className="game-number">{sweTime}</p>
      {winner ? (
        <div className="winners">
          <h2>{winner.name}</h2>

          <div className="img-container">
            <img src={fixImgUrl(`${winner.imgName}`)} alt="" />
          </div>
          <p>
            Detta är {winner.wins}: e gången {winner.name} vinner en match
          </p>
        </div>
      ) : (
        <div className="no-winners">
          <h2>Det fanns ingen data att visa</h2>
          <p>Det kan bero på att hamstern inte längre finns i vår databas</p>
        </div>
      )}
      {loser ? (
        <div className="losers">
          <h2>{loser.name}</h2>
          <div className="img-container">
            <img src={fixImgUrl(`${loser.imgName}`)} alt="" />
          </div>
          <p>
            Detta är {loser.defeats}:e gången {loser.name} förlorar
          </p>
        </div>
      ) : (
        <div className="no-losers">
          <h2>Det fanns ingen data att visa</h2>
          <p>Det kan bero på att hamstern inte längre finns i vår databas</p>
        </div>
      )}
      <p
        className="trash-can"
        id={data ? `${data.id}` : ""}
        onClick={(e) => deleteGame(e)}
      >
        &#128465;
      </p>
    </div>
  );
}

export default GameCard;
