import React, { useState, useEffect, SyntheticEvent } from "react";
import HamsterGallery from "./HamsterGallery";
import { Hamster } from "../Interfaces";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { addHamster } from "../state/features/hamsterSlice";
import { reRenderHamster } from "../state/features/reRenderSlice";
import fixUrl from "../utils";
import "./GetSearchFilter.css";
import { searchHamster } from "../state/features/searchSlice";
import AddHamster from "./AddHamster";

function GetSearchFilter() {
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const [data, setData] = useState<Hamster[] | null>(null);
  const [reRenderPage, setReRender] = useState(reRenderData);
  const [searchHamsterInput, setSearchHamster] = useState<string>("");
  const [floatingName, setFloatingName] = useState("floating-label");
  const dispatch = useDispatch();
  const [showOrHide, setShowOrHide] = useState(false);
  const [rotate, setRotate] = useState("0deg");

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: Hamster[] = await response.json();
      let data: Hamster[] = apiData;
      dispatch(addHamster(apiData));
      setData(hamsterData);
      dispatch(reRenderHamster(!reRenderData));
    }
    getData();
  }, []);

  useEffect(() => {
    setData(hamsterData);
  }, [reRenderData]);

  let sortingArray: Hamster[] = Object.assign([], data);

  function searchValue(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(searchHamster(e.target.value));
    setSearchHamster(e.target.value);
  }

  function selectedValue(key: string): void {
    let sort: string = key;
    if (sort === "name") {
      const hamstersSortedByName: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.name.localeCompare(b.name)
      );
      setData(hamstersSortedByName);
      setShowOrHide(!showOrHide);
    }
    if (sort === "ageAsc") {
      const hamstersSortedByOldest: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.age - b.age
      );
      setData(hamstersSortedByOldest);
      setShowOrHide(!showOrHide);
    }
    if (sort === "ageDes") {
      const hamstersSortedByYoungest: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => b.age - a.age
      );
      setData(hamstersSortedByYoungest);
      setShowOrHide(!showOrHide);
    }
    if (sort === "wins") {
      const hamsterSortedByGames: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.wins - a.wins
      );
      setData(hamsterSortedByGames);
      setShowOrHide(!showOrHide);
    }
    if (sort === "lost") {
      const hamsterSortedByLoss: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.defeats - a.defeats
      );
      setData(hamsterSortedByLoss);
      setShowOrHide(!showOrHide);
    }
    if (sort === "close") {
      setShowOrHide(!showOrHide);
    }
  }

  function openClose() {
    setShowOrHide(!showOrHide);
    if (showOrHide) {
      setRotate("0deg");
    } else {
      setRotate("180deg");
    }
  }

  return (
    <div className="get-search-filter">
      <div className="sort-and-serach-container">
        <div className="custom-sort" onClick={() => openClose()}>
          <div className="custom-sort-header">
            <h3>Filtrera efter</h3>
            <p style={{ rotate: `${rotate}` }}>&#709;</p>
          </div>

          <div
            className={
              showOrHide
                ? "custom-dropdown-container-open"
                : "custom-dropdown-container-close"
            }
          >
            <p onClick={(e) => selectedValue("name")}>Namn A-Ö</p>
            <p onClick={(e) => selectedValue("ageAsc")}>Ålder stigande</p>
            <p onClick={(e) => selectedValue("ageDes")}>Ålder sjunkande</p>
            <p onClick={(e) => selectedValue("wins")}>Flest vinster</p>
            <p onClick={(e) => selectedValue("lost")}>Flest förluster</p>
            <p onClick={(e) => selectedValue("close")}>Stäng</p>
          </div>
        </div>
        <div className="input-container">
          <span className={floatingName}>Sök efter en hamster</span>
          <input
            value={searchHamsterInput}
            type="text"
            onChange={(e) => searchValue(e)}
            onFocus={() => setFloatingName("floating-label-change")}
            onBlur={() => setFloatingName("floating-label")}
          />
        </div>
      </div>
      <HamsterGallery hamstersArray={data} />
    </div>
  );
}

export default GetSearchFilter;
