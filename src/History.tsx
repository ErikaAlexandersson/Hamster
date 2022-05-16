import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Matches } from "./Interfaces";

function History() {
  const [data, setData] = useState<Matches[] | null>(null);

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch("http://localhost:1337/matches");
      const hamsterData: Promise<Matches> = await response.json();
      let data: any[] = hamsterData;
      setData(data);
    }
    getData();
  }, []);

  const games = data?.map((data) => {
    return <GameCard data={data} key={data.winnerId} />;
  });
  return <div className="history">{games}</div>;
}

export default History;
