import { useState, useEffect } from "react";
import HamsterGallery from "./HamsterGallery";
import { Hamster } from "./Interfaces";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { addHamster } from "./state/features/hamsterSlice";
import { reRenderHamster } from "./state/features/reRenderSlice";
import fixUrl from "./utils";
import "./GetSearchFilter.css";
import { searchHamster } from "./state/features/searchSlice";
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

  function searchValue(e: any) {
    dispatch(searchHamster(e.target.value));
    setSearchHamster(e.target.value);
  }

  function selectedValue(e: any): void {
    let sort: string = e.target.textContent;
    if (sort === "Namn A-Ö") {
      const hamstersSortedByName: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.name.localeCompare(b.name)
      );
      setData(hamstersSortedByName);
      setShowOrHide(!showOrHide);
    }
    if (sort === "Ålder stigande") {
      const hamstersSortedByOldest: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => a.age - b.age
      );
      setData(hamstersSortedByOldest);
      setShowOrHide(!showOrHide);
    }
    if (sort === "Ålder sjunkande") {
      const hamstersSortedByYoungest: Hamster[] = sortingArray?.sort(
        (a: Hamster, b: Hamster) => b.age - a.age
      );
      setData(hamstersSortedByYoungest);
      setShowOrHide(!showOrHide);
    }
    if (sort === "Flest vinster") {
      const hamsterSortedByGames: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.wins - a.wins
      );
      setData(hamsterSortedByGames);
      setShowOrHide(!showOrHide);
    }
    if (sort === "Flest förluster") {
      const hamsterSortedByLoss: Hamster[] = sortingArray.sort(
        (a: Hamster, b: Hamster) => b.defeats - a.defeats
      );
      setData(hamsterSortedByLoss);
      setShowOrHide(!showOrHide);
    }
    if (sort === "Stäng") {
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
            <p onClick={(e) => selectedValue(e)}>Namn A-Ö</p>
            <p onClick={(e) => selectedValue(e)}>Ålder stigande</p>
            <p onClick={(e) => selectedValue(e)}>Ålder sjunkande</p>
            <p onClick={(e) => selectedValue(e)}>Flest vinster</p>
            <p onClick={(e) => selectedValue(e)}>Flest förluster</p>
            <p onClick={(e) => selectedValue(e)}>Stäng</p>
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
