import { Hamster, Matches } from "./Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
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
  const loserArray = loser?.map((lost) => {
    let loserInfo = hamsterData.find((hamster) => hamster.id === lost.winnerId);
    if (loserInfo !== undefined) {
      loserHamsterArray.push(loserInfo);
    }
  });

  return (
    <div className="game-info">
      <div className="win-container">
        {winnerHamsterArray.length >= 1 ? (
          <p>Har vunnit mot:</p>
        ) : (
          <p>Hamstern har inte vunnit något ännu, in och rösta!</p>
        )}

        {winnerHamsterArray
          ? winnerHamsterArray.map((winn) => (
              <span key={winn.id}>{winn.name} </span>
            ))
          : null}
      </div>
      <div className="lose-container">
        {loserHamsterArray.length >= 1 ? (
          <p>Har besegrats av</p>
        ) : (
          <p>Denna hamstern är hittils obesegrad!</p>
        )}

        {loserHamsterArray.length >= 1
          ? loserHamsterArray.map((loser) => (
              <span key={loser.id}>{loser.name} </span>
            ))
          : null}
      </div>
    </div>
  );
}

export default GameInfo;
