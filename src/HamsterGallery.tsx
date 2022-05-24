import { useEffect, useState } from "react";
import { Hamster } from "./Interfaces";
import "./HamsterGallery.css";
import "animate.css";
import HamsterCard from "./HamsterCard";
import AddHamster from "./AddHamster";
import { RootState } from "./state/store";
import { useSelector, useDispatch } from "react-redux";
import fixUrl from "./utils";
import { showOrHideDelete } from "./state/features/deleteSlice";
interface Prop {
  hamstersArray: Hamster[] | null;
}

function HamsterGallery({ hamstersArray }: Prop) {
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const [data, setData] = useState(hamstersArray);
  const [searchHamster, setSearchHamster] = useState<string>("");

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  function showOrNot() {
    dispatch(showOrHideDelete(!showDelete));
    setShowDelete(!showDelete);
  }

  let sortingArray: Hamster[] = Object.assign([], hamstersArray);

  let search = sortingArray.filter((hamster) => {
    if (searchHamster.length <= 1) {
      return true;
    } else {
      console.log(searchHamster.length);
      return hamster.name.includes(searchHamster);
    }
  });

  const hamsters = search?.map((hamster) => {
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
      <AddHamster />
      <button onClick={() => showOrNot()}>Ta bort hamster</button>
      <input
        type="text"
        placeholder="Sök efter hamster"
        value={searchHamster}
        onChange={(event) => setSearchHamster(event.target.value)}
      />
      <main>{hamsters}</main>
    </div>
  );
}

export default HamsterGallery;
