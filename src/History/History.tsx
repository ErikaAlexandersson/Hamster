import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Matches } from "../Interfaces";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import fixUrl from "../utils";
import MatchByDate from "./MatchByDate";
import { addMatches } from "../state/features/matchesSlice";
import "./History.css";
function History() {
  const matches = useSelector((state: RootState) => state.matches.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const [data, setData] = useState<Matches[] | null>(null);
  const [sortedData, setSortedData] = useState([]);
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

  useEffect(() => {
    setData(matches);
  }, [reRenderData]);
  const copyOfArray: Matches[] = Object.assign([], data);

  const matchesSortedByTime = copyOfArray?.sort((a, b) => b.time - a.time);

  let newThing = null;

  if (matchesSortedByTime) {
    newThing = [[matchesSortedByTime[0]]];
    for (let i = 1; matchesSortedByTime.length > i; i++) {
      if (
        matchesSortedByTime[i].date === newThing[newThing.length - 1][0].date
      ) {
        newThing[newThing.length - 1].push(matchesSortedByTime[i]);
      } else {
        newThing.push([matchesSortedByTime[i]]);
      }
    }
  }

  function createIndex() {
    let key = new Date().getTime();
    let random = Math.floor(Math.random() * 10000000);
    return key + random;
  }

  const newData = newThing?.map((date) => {
    return <MatchByDate data={date} key={createIndex() + 10 + "p"} />;
  });

  return <>{data ? <div className="history"> {newData}</div> : null}</>;
}

export default History;
