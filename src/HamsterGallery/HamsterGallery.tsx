import { useState } from "react";
import { Hamster } from "../Interfaces";
import "./HamsterGallery.css";
import "animate.css";
import HamsterCard from "./HamsterCard";
import AddHamster from "./AddHamster";
import { RootState } from "../state/store";
import { searchHamster } from "../state/features/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import "./HamsterCard.css";
interface Prop {
  hamstersArray: Hamster[] | null;
}

function HamsterGallery({ hamstersArray }: Prop) {
  // const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const searchValue = useSelector(
    (state: RootState) => state.searchSlice.value
  );
  const [data, setData] = useState(hamstersArray);
  const [searchHamster, setSearchHamster] = useState<string>(searchValue);
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

  let sortingArray: Hamster[] = Object.assign([], hamstersArray);

  let search = sortingArray.filter((hamster) => {
    if (searchValue.length <= 1) {
      return true;
    } else {
      return hamster.name.includes(searchValue);
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
      <main>{hamsters}</main>
    </div>
  );
}

export default HamsterGallery;
