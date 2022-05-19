import { Hamster } from "./Interfaces";
import "./Cutest.css";
import fixUrl from "./utils";

interface Prop {
  data: Hamster | null;
}

function Cutest({ data }: Prop) {
  if (data === null || undefined) {
    return <div>Det finns ingen hamster...</div>;
  }
  return (
    <div className="cutest">
      <div className="cutest-container">
        {data ? (
          <div>
            <h1>{data.name}</h1>
            <img src={fixUrl(`/img/${data.imgName}`)} alt="" />

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
