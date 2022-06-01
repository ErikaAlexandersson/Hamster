import { useEffect, useState } from "react";
import { Hamster } from "../Interfaces";
import { fixImgUrl } from "../utils";
import fixUrl from "../utils";
import "./CompetingHamster.css";

interface Prop {
  vote: (e: any) => void;
  whatHamster: (e: any) => void;
}

function CompetingHamster({ vote, whatHamster }: Prop) {
  const [data, setData] = useState<Hamster | null>(null);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/random"));
      const apiData: Hamster = await response.json();
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
          <img src={fixImgUrl(`${data.imgName}`)} alt="" />
          <p>Är {data.age} år gammal</p>
          <p>Älskar att {data.loves}</p>
          <p>Äter helst {data.favFood}</p>
          <button onClick={() => vote(data)}>
            <span className="button_top">Rösta</span>
          </button>
        </div>
      ) : (
        <p>Vi håller på att hämta två goa hamstrar...</p>
      )}
    </>
  );
}

export default CompetingHamster;
