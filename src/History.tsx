import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Matches } from "./Interfaces";
import fixUrl from "./utils";
function History() {
  const [data, setData] = useState<Matches[] | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/matches"));
      const hamsterData: any = await response.json();
      let data: any[] = hamsterData;
      setData(data);
    }
    getData();
  }, []);
  const matchesSortedByTime = data?.sort((a, b) => b.time - a.time);

  const shortList = matchesSortedByTime?.slice(start, end);

  function getNextTen() {
    setStart(start);
    setEnd(end + 10);
  }

  const games = shortList?.map((matches, index) => {
    return <GameCard data={matches} key={matches.time} index={index} />;
  });
  return (
    <div className="history">
      <h1>Vinnare</h1>
      <h1>Förlorare</h1>
      {games}
      <button onClick={() => getNextTen()}>Visa mer...</button>
    </div>
  );
}

export default History;
