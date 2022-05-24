import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hamster } from "./Interfaces";
import { RootState } from "./state/store";
import { addHamster } from "./state/features/hamsterSlice";
import { reRenderHamster } from "./state/features/reRenderSlice";
import fixUrl from "./utils";

interface Prop {
  data: Hamster;
}
function DeleteHamster({ data }: Prop) {
  const [areYouSure, setAreYouSure] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toBoRemoved = useSelector((state: RootState) => state.remove.value);
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  function deleteHamster() {
    console.log(fixUrl(`/hamsters/${data.id}`));
    fetch(fixUrl(`/hamsters/${data.id}`), {
      method: "DELETE",
    });
    console.log(hamsterData);
    const filtredArray = hamsterData.filter((hamster) => {
      return hamster.id !== data.id;
    });
    console.log(filtredArray);
    dispatch(reRenderHamster(!reRenderData));
    dispatch(addHamster(filtredArray));
  }

  return (
    <div className="delete-hamster">
      {areYouSure ? (
        <div>
          <p>Vill du verkligen ta bort {data.name}</p>
          <button onClick={() => deleteHamster()}>Ja</button>{" "}
          <button onClick={() => setAreYouSure(!areYouSure)}>Nej</button>
        </div>
      ) : (
        <button onClick={() => setAreYouSure(!areYouSure)}>
          Delete hamster
        </button>
      )}
    </div>
  );
}

export default DeleteHamster;
