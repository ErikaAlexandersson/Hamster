import { useEffect, useState } from "react";
import { Hamster } from "./Interfaces";
import "./CompetingHamster.css";

interface Prop {
  vote: (e: any) => void;
  whatHamster: (e: any) => void;
}

function CompetingHamster({ vote, whatHamster }: Prop) {
  const [data, setData] = useState<Hamster | null>(null);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(
        "http://localhost:1337/hamsters/random"
      );
      const apiData: any = await response.json();
      let data: Hamster = apiData;
      setData(apiData);
      whatHamster(data);
    }
    getData();
  }, []);

  return (
    <>
      {data ? (
        <div className="competing-hamster" id={data.id}>
          <h1>{data.name}</h1>
          <img src={`http://localhost:1337/img/${data.imgName}`} alt="" />
          <p>Är {data.age} år gammal</p>
          <p>Älskar att {data.loves}</p>
          <p>Äter helst {data.favFood}</p>
          <button onClick={(e) => vote(data)}>Rösta</button>
        </div>
      ) : (
        <p>Vi håller på att hämta två goa hamstrar...</p>
      )}
    </>
  );
}

export default CompetingHamster;
