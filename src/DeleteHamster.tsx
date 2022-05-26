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
          <button onClick={() => deleteHamster()}>
            <span className="button_top">Ja</span>
          </button>

          <button onClick={() => setAreYouSure(!areYouSure)}>
            <span className="button_top">Nej</span>
          </button>
        </div>
      ) : (
        <p
          title="Klicka för att ta bort hamstern"
          className="trash-can"
          onClick={() => setAreYouSure(!areYouSure)}
        >
          &#128465;
        </p>
      )}
    </div>
  );
}

export default DeleteHamster;
