import { Hamster, Matches } from "./Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import "./GameInfo.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fixImgUrl } from "./utils";
interface Prop {
  data: Hamster;
  winner: Matches[] | null;
  loser: Matches[] | null;
}

function GameInfo({ data, winner, loser }: Prop) {
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  let winnerHamsterArray: Hamster[] = [];
  let loserHamsterArray: Hamster[] = [];
  const winnerArray = winner?.map((winn) => {
    let winnerInfo = hamsterData.find((hamster) => hamster.id === winn.loserId);
    if (winnerInfo !== undefined) {
      winnerHamsterArray.push(winnerInfo);
    }
    return winnerInfo;
  });

  loser?.forEach((lost) => {
    let loserInfo = hamsterData.find((hamster) => hamster.id === lost.winnerId);
    if (loserInfo !== undefined) {
      loserHamsterArray.push(loserInfo);
    }
  });

  let hasWonAgainst = winnerHamsterArray.map((hamster) => {
    return (
      <>
        <li>
          {hamster.name}
          <img className="tiny-image" src={fixImgUrl(hamster.imgName)}></img>
        </li>
      </>
    );
  });

  let hasLostAgainst = loserHamsterArray.map((hamster) => {
    return (
      <>
        <li>
          {hamster.name}
          <img className="tiny-image" src={fixImgUrl(hamster.imgName)}></img>
        </li>
      </>
    );
  });

  return (
    <div className="game-info">
      <div className="win-container">
        {winnerHamsterArray.length <= 0 && loserHamsterArray.length <= 0 ? (
          <div className="no-info">
            <p>Hamstern har inte tävlat hittils... </p>
            <button>
              <Link className="button_top" to="/compete">
                Gå in och rösta
              </Link>
            </button>
          </div>
        ) : null}
        {winnerHamsterArray.length >= 1 ? (
          <div className="winner-container">
            <h3>Har vunnit mot</h3>
            <ul className="wrap-container">{hasWonAgainst}</ul>
          </div>
        ) : (
          <div className="winner-container">
            <h3 className="no-winner">
              Denna hamstern har inte vunnit något ännu
            </h3>
          </div>
        )}
        {loserHamsterArray.length >= 1 ? (
          <div className="loser-container">
            <h3>Har förlorat mot</h3>
            <ul className="wrap-container">{hasLostAgainst}</ul>
          </div>
        ) : (
          <div className="loser-container">
            <h3 className="no-loser">Denna hamstern är hittils obesegrad</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameInfo;
