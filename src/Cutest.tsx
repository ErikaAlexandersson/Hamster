import { Hamster } from "./Interfaces";
import "./Cutest.css";

interface Prop {
  data: Hamster[] | null;
}

function Cutest({ data }: Prop) {
  const cutestHamster = data?.map((cutest) => {
    return (
      <div className="cutest-container" key={cutest.id}>
        <div>
          <h1>{cutest.name}</h1>
          <img src={`http://localhost:1337/img/${cutest.imgName}`} alt="" />

          <h4>Antal matcher: {cutest.games}</h4>
          <div className="stats-container">
            <p>Vunna: {cutest.wins}</p>
            <p>Förlorade: {cutest.defeats}</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="cutest">{cutestHamster}</div>;
}

export default Cutest;
