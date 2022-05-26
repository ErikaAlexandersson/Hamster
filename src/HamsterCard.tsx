import { Hamster } from "./Interfaces";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import fixUrl from "./utils";
import { fixImgUrl } from "./utils";
import GameInfo from "./GameInfo";
import DeleteHamster from "./DeleteHamster";

interface Prop {
  data: Hamster;
  className: string;
  changeClassName: (id: string) => void;
}

function HamsterCard({ data, className, changeClassName }: Prop) {
  const [showOrHide, setShowOrHide] = useState(false);
  const [transform, setTransform] = useState("0");
  const [winHistory, setWinHistory] = useState<any[] | null>(null);
  const [loserHistory, setLoserHistory] = useState<any[] | null>(null);

  function switchClassName(id: any) {
    setShowOrHide(!showOrHide);
    changeClassName(id);
  }

  function flipCard() {
    console.log("Nu körs flipcard");
    setTransform("180");
    setShowOrHide(false);
    getStats();
  }

  let content = null;
  if (history === null || history === undefined) {
    content = "Det finns tyvärr ingen information att";
  }

  async function getStats() {
    console.log("Data.id", data.id, "Namn", data.name);
    const winnerResponse: Response = await fetch(
      fixUrl(`/matchWinners/${data.id}`)
    );
    if (winnerResponse.status === 404) {
      console.log("404");
      setWinHistory([]);
    } else {
      const winnerData: any = await winnerResponse.json();
      setWinHistory(winnerData);
    }

    const loserResponse: Response = await fetch(
      fixUrl(`/matchLosers/${data.id}`)
    );
    if (loserResponse.status === 404) {
      console.log(404);
      setLoserHistory([]);
    } else {
      const loserData: any = await loserResponse.json();
      let loser: any[] = loserData;
      setLoserHistory(loser);
    }
  }

  return (
    <div className="flip-card">
      <div
        className="flip-card-inner"
        style={{ transform: `rotateY(${transform}deg)` }}
      >
        <div className="flip-card-front">
          <div className="hamster-container">
            <DeleteHamster data={data} />
            <h1>{data.name}</h1>

            <div className="grow-container">
              <div className="first-info">
                <p>Håll över bilden för att zooma</p>
                <div className="img-container">
                  {data.imgName === "" ? (
                    <p id="img-error-text">Hittade ingen bild...</p>
                  ) : (
                    <img src={fixImgUrl(data.imgName)} alt="" />
                  )}
                </div>
                <div
                  className={
                    showOrHide
                      ? "overflow-container-clicked"
                      : "overflow-container"
                  }
                >
                  <div className="text-container">
                    <p
                      className="info"
                      onClick={() => switchClassName(data.id)}
                    >
                      {showOrHide ? "X" : "info"}
                    </p>
                    <p>Ålder: {data.age}</p>
                    <p>Gillar att: {data.loves}</p>
                    <p>Favoritmat: {data.favFood}</p>
                    {showOrHide ? (
                      <div className="animated-container">
                        <p className="animate__animated animate__fadeInLeft animate__delay-2s">
                          Antal spelade matcher: {data.games}
                        </p>
                        <p className="animate__animated animate__fadeInRight animate__delay-3s">
                          Antal vunna matcher: {data.wins}
                        </p>
                        <p className="animate__animated animate__fadeInLeft animate__delay-4s">
                          Antal förluster: {data.defeats}
                        </p>
                        <p className="send" onClick={() => flipCard()}>
                          Se statistik
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          {winHistory || loserHistory ? (
            <GameInfo data={data} winner={winHistory} loser={loserHistory} />
          ) : null}

          <p className="send" onClick={() => setTransform("0")}>
            Tillbaka
          </p>
        </div>
      </div>
    </div>
  );
}

export default HamsterCard;
