import { Hamster } from "./Interfaces";
import "./Cutest.css";
import { fixImgUrl } from "./utils";
import { getMetadata } from "firebase/storage";

interface Prop {
  data: Hamster | null;
  getData?: () => void;
}

function Cutest({ data, getData }: Prop) {
  if ((data === null || data === undefined) && getData !== undefined) {
    return (
      <div>
        <p>Vi hittade ingen hamster</p>
        <button onClick={() => getData()}>Pröva att hämta datan igen</button>
      </div>
    );
  }
  return (
    <div className="cutest">
      <div className="cutest-container">
        {data ? (
          <div>
            <h1>{data.name}</h1>
            <img
              id="trophy"
              className="animate__animated animate__rubberBand "
              src="/trophy.png"
              alt=""
            />
            <img src={fixImgUrl(`${data.imgName}`)} alt="" />

            <h4>Antal matcher: {data.games}</h4>
            <div className="stats-container">
              <p>Vunna: {data.wins}</p>
              <p>Förlorade: {data.defeats}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cutest;
