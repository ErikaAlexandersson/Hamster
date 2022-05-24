import { useState, useEffect } from "react";
import HamsterGallery from "./HamsterGallery";
import { Hamster } from "./Interfaces";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { addHamster } from "./state/features/hamsterSlice";
import { reRenderHamster } from "./state/features/reRenderSlice";
import fixUrl from "./utils";

function GetSearchFilter() {
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const [data, setData] = useState<Hamster[] | null>(null);
  const [reRenderPage, setReRender] = useState(reRenderData);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();
      let data: any[] = apiData;
      dispatch(addHamster(apiData));
      setData(hamsterData);
      dispatch(reRenderHamster(!reRenderData));
      console.log("Detta är i useEffect", reRenderPage);
    }
    getData();
  }, []);

  useEffect(() => {
    setData(hamsterData);
  }, [reRenderData]);

  let sortingArray: Hamster[] = Object.assign([], data);

  function selectedValue(e: any): void {
    let sort: string = e.target.value;
    if (sort === "name") {
      const hamstersSortedByName: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.name.localeCompare(b.name)
      );
      setData(hamstersSortedByName);
    }
    if (sort === "age") {
      const hamstersSortedByAge: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.age - b.age
      );
      setData(hamstersSortedByAge);
    }
    if (sort === "Flest vinster") {
      const hamsterSortedByGames: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.wins - a.wins
      );
      setData(hamsterSortedByGames);
    }
    if (sort === "Flest förluster") {
      const hamsterSortedByLoss: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.defeats - a.defeats
      );
      setData(hamsterSortedByLoss);
    }
  }

  return (
    <div>
      <header>
        <h1>Galleriet</h1>
      </header>
      <p>Sortera efter: </p>
      <select onChange={(e) => selectedValue(e)}>
        <option value="Inget">Inget</option>
        <option value="name">Namn</option>
        <option value="age">Ålder</option>
        <option value="Flest vinster">Flest vinster</option>
        <option value="Flest förluster">Flest förluster</option>
      </select>
      <HamsterGallery hamstersArray={data} />
    </div>
  );
}

export default GetSearchFilter;
