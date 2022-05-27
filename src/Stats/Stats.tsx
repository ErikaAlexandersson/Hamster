import { useEffect, useState } from "react";
import Cutest from "../Cutest";
import { Hamster } from "../Interfaces";
import "./Stats.css";
import fixUrl from "../utils";

function Stats() {
  const [winners, setWinners] = useState<Hamster[] | null>(null);
  const [losers, setLoser] = useState<Hamster[] | null>(null);
  async function getWinners(): Promise<void> {
    const response: Response = await fetch(fixUrl("/winners"));
    const apiData = await response.json();
    let data: Hamster[] = apiData;
    setWinners(data);
  }

  async function getLosers(): Promise<void> {
    const response: Response = await fetch(fixUrl("/losers"));
    const apiData = await response.json();
    let data: Hamster[] = apiData;
    setLoser(data);
  }

  useEffect(() => {
    getWinners();
    getLosers();
  }, []);

  const losersData = losers?.map((hamster) => {
    return <Cutest data={hamster} key={hamster.id} />;
  });

  const winnersData = winners?.map((hamster) => {
    return <Cutest data={hamster} key={hamster.id} />;
  });

  return (
    <div className="stats">
      <div className="winners">
        <h1>Flest vinster</h1>
        {winnersData}
      </div>
      <div className="losers">
        <h1>Flest förluster</h1>
        {losersData}
      </div>
    </div>
  );
}

export default Stats;
