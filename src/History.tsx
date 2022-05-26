import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Matches } from "./Interfaces";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import fixUrl from "./utils";
import MatchByDate from "./MatchByDate";
import { addMatches } from "./state/features/matchesSlice";
function History() {
  const matches = useSelector((state: RootState) => state.matches.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const [data, setData] = useState<Matches[] | null>(null);
  const dispatch = useDispatch();

  async function getData() {
    const response: Response = await fetch(fixUrl("/matches"));
    const hamsterData: any = await response.json();
    let data: Matches[] = hamsterData;
    data.forEach((match) => {
      let milliseconds = match.time;
      let date = new Date(milliseconds);
      let sweDate = date.toLocaleDateString();
      match.date = sweDate;
    });
    setData(data);
    dispatch(addMatches(data));
  }
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setData(matches);
  // }, [reRenderData]);

  const copyOfArray: Matches[] = Object.assign([], data);

  const matchesSortedByTime = copyOfArray?.sort((a, b) => b.time - a.time);

  let newThing = null;

  if (data) {
    newThing = [[data[0]]];
    for (let i = 1; data.length > i; i++) {
      if (data[i].date === newThing[newThing.length - 1][0].date) {
        newThing[newThing.length - 1].push(data[i]);
      } else {
        newThing.push([data[i]]);
      }
    }
  }

  function createIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  const newData = newThing?.map((date, index) => {
    return <MatchByDate data={date} key={createIndex(1000)} />;
  });

  return (
    <div className="history">
      <h3>Välj ett datum i listan för att se vilka hamstrar som tävlade då</h3>
      {newData}
    </div>
  );
}

export default History;
