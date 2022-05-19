import { useEffect, useState } from "react";
import { Hamster } from "./Interfaces";
import "./HamsterGallery.css";
import "animate.css";
import HamsterCard from "./HamsterCard";
import { useDispatch } from "react-redux";
import { addHamster } from "./state/features/hamsterSlice";
import AddHamster from "./AddHamster";
function HamsterGallery() {
  const [data, setData] = useState<Hamster[] | null>(null);
  const [orderBy, setOrderBy] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch("http://localhost:1337/hamsters/");
      const apiData: any = await response.json();
      let data: any[] = apiData;
      setData(apiData);
      dispatch(addHamster(apiData));
    }
    getData();
  }, []);

  function changeClassName(id: string) {
    setData(
      [...(data || [])].map((hamster) => {
        if (hamster.id === id) {
          return {
            ...hamster,
            className: "overflow-container-clicked",
          };
        } else {
          return {
            ...hamster,
            className: "overflow-container",
          };
        }
      })
    );
  }
  let sortingArray = Object.assign([], data);

  function selectedValue(e: any) {
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

  const hamsters = data?.map((hamster) => {
    return (
      <HamsterCard
        data={hamster}
        key={hamster.id}
        className={"overflow-container"}
        changeClassName={changeClassName}
      />
    );
  });

  return (
    <div className="hamster-gallery">
      <header>
        <h1>Galleriet</h1>
        <p>Sortera efter: </p>
        <select onChange={(e) => selectedValue(e)}>
          <option value="Inget">Inget</option>
          <option value="name">Namn</option>
          <option value="age">Ålder</option>
          <option value="Flest vinster">Flest vinster</option>
          <option value="Flest förluster">Flest förluster</option>
        </select>
      </header>
      <AddHamster />
      <main>{hamsters}</main>
    </div>
  );
}

export default HamsterGallery;
