import { Hamster } from "./Interfaces";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/store";
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
  const showOrHideDelete = useSelector(
    (state: RootState) => state.delete.value
  );
  const dispatch = useDispatch();

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
    const winnerResponse: Response = await fetch(
      fixUrl(`/matchWinners/${data.id}`)
    );
    const winnerData: any = await winnerResponse.json();
    let winner: any[] = winnerData;
    setWinHistory(winner);

    const loserResponse: Response = await fetch(
      fixUrl(`/matchLosers/${data.id}`)
    );
    const loserData: any = await loserResponse.json();
    let loser: any[] = loserData;
    setLoserHistory(loser);
    if (!winnerResponse.ok) {
      console.log("Nope det finns inget");
    }
    return winnerData;
  }

  return (
    <div className="flip-card">
      <div
        className="flip-card-inner"
        style={{ transform: `rotateY(${transform}deg)` }}
      >
        <div className="flip-card-front">
          <div className="hamster-container">
            <h1>{data.name}</h1>
            {showOrHideDelete ? <DeleteHamster data={data} /> : null}

            <div className="grow-container">
              <div className="first-info">
                <p>Hover to zoom</p>
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
                      {showOrHide ? "v" : "i"}
                    </p>
                    <p>Ålder: {data.age}</p>
                    <p>Gillar: {data.loves}</p>
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
                        <button onClick={() => flipCard()}>Se statistik</button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <GameInfo data={data} winner={winHistory} loser={loserHistory} />
          <button id="flip" onClick={() => setTransform("0")}>
            Tillbaka
          </button>
        </div>
      </div>
    </div>
  );
}

export default HamsterCard;
