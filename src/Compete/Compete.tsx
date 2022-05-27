import { useEffect, useState } from "react";
import { Hamster } from "../Interfaces";
import "./Compete.css";
import CompetingHamster from "./CompetingHamster";
// import FireWorks from "./FireWorks";
import fixUrl from "../utils";
import Cutest from "../Cutest";

function Compete() {
  const [competingHamsters, setCompetingHamsters] = useState<Hamster[]>([]);
  const [counter, setCounter] = useState(3);
  const [showOrHide, setShowOrHide] = useState<boolean>(false);
  const [voteOrWinner, setVoteorWinner] = useState<string>(
    "Rösta på din favorit"
  );
  const [winner, setWinner] = useState<Hamster | null>(null);

  useEffect(() => {
    if (counter <= 0) {
      return;
    } else {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  async function getWinner(winner: Hamster) {
    winner.wins = winner.wins + 1;
    winner.games = winner.games + 1;
    setWinner(winner);
  }

  async function vote(hamster: Hamster) {
    let winnerData = { games: hamster.games + 1, wins: hamster.wins + 1 };
    fetch(fixUrl(`/hamsters/${hamster.id}`), {
      body: JSON.stringify(winnerData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => {});
    let looser = competingHamsters.filter((e) => e.id !== hamster.id);
    let looserData = {
      games: looser[0].games + 1,
      defeats: looser[0].defeats + 1,
    };
    fetch(fixUrl(`/hamsters/${looser[0].id}`), {
      body: JSON.stringify(looserData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => {});
    let timeStamp = Date.now();
    let matchData = {
      winnerId: hamster.id,
      loserId: looser[0].id,
      time: timeStamp,
    };
    fetch(fixUrl("/matches"), {
      body: JSON.stringify(matchData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
    setShowOrHide(true);
    setVoteorWinner("Vinnaren är");
    getWinner(hamster);
  }

  function whatHamster(e: Hamster) {
    setCompetingHamsters((hamsters) => [...hamsters, e]);
  }
  function refresh() {
    setCounter(3);
    setWinner(null);
    setShowOrHide(false);
    setVoteorWinner("Rösta på din favorit");
    setCompetingHamsters([]);
  }

  return (
    <div className="compete">
      <header>
        <h1>{voteOrWinner}</h1>
        {counter > 0 ? <p id="counter">{counter}</p> : null}
      </header>

      {showOrHide && winner ? (
        <div className="winner-container">
          <img
            className="animate__animated animate__tada"
            id="trophy"
            src="./trophy.png"
            alt=""
          />
          <Cutest key={counter} data={winner} />
          <button onClick={() => refresh()}>
            <span className="button_top">Starta ny match</span>
          </button>
        </div>
      ) : (
        <main>
          <div className="animate__animated animate__fadeInLeft animate__delay-3s">
            <CompetingHamster vote={vote} whatHamster={whatHamster} />
          </div>
          <div className="animate__animated animate__fadeInRight animate__delay-3s">
            <CompetingHamster vote={vote} whatHamster={whatHamster} />
          </div>
        </main>
      )}
    </div>
  );
}

export default Compete;
