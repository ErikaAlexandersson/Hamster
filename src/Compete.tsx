import { useEffect, useState } from "react";
import { Hamster } from "./Interfaces";
import "./Compete.css";
import CompetingHamster from "./CompetingHamster";
import FireWorks from "./FireWorks";
import Cutest from "./Cutest";

function Compete() {
  const [competingHamsters, setCompetingHamsters] = useState<Hamster[]>([]);
  const [counter, setCounter] = useState(3);
  const [showOrHide, setShowOrHide] = useState<boolean>(false);
  const [voteOrWinner, setVoteorWinner] = useState<string>(
    "Rösta på din favorit"
  );
  const [winner, setWinner] = useState<Hamster[] | []>([]);

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

  useEffect(() => {
    function updateHamster(e: any) {
      if (winner.length >= 1) {
        if (competingHamsters.includes(winner[0])) {
          console.log(winner);
        }
      }
    }
    updateHamster(winner);
  }, [winner]);

  async function getWinner(e: string) {
    const response: Response = await fetch(
      `http://localhost:1337/hamsters/${e}`
    );
    const hamsterData: any = await response.json();

    if (hamsterData !== null) {
      hamsterData.id = e;
      setWinner((winner) => [...winner, hamsterData as Hamster]);
    }
  }

  async function vote(hamster: any) {
    let winnerData = { games: hamster.games + 1, wins: hamster.wins + 1 };
    fetch(`http://localhost:1337/hamsters/${hamster.id}`, {
      body: JSON.stringify(winnerData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => {
      console.log(response);
    });
    let looser = competingHamsters.filter((e) => e.id !== hamster.id);
    let looserData = {
      games: looser[0].games + 1,
      defeats: looser[0].defeats + 1,
    };
    fetch(`http://localhost:1337/hamsters/${looser[0].id}`, {
      body: JSON.stringify(looserData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => {
      console.log(response);
    });
    let matchData = { winnerId: hamster.id, loserId: looser[0].id };
    fetch("http://localhost:1337/matches", {
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
    getWinner(hamster.id);
  }

  function whatHamster(e: Hamster) {
    setCompetingHamsters((hamsters) => [...hamsters, e]);
  }
  function refresh() {
    setCounter(3);
    setWinner([]);
    setShowOrHide(false);
    setVoteorWinner("Rösta på din favorit");
  }

  return (
    <div className="compete">
      <header>
        <h1>{voteOrWinner}</h1>
        {counter > 0 ? <p id="counter">{counter}</p> : null}
      </header>

      {showOrHide && winner ? (
        <div className="winner-container">
          <FireWorks />
          <img
            className="animate__animated animate__tada"
            id="trophy"
            src="./trophy.png"
            alt=""
          />
          <Cutest key={counter} data={winner} />
          <button onClick={() => refresh()}>Starta ny match!</button>
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
