import { useEffect, useState } from "react";
import Cutest from "./Cutest";
import { Hamster } from "./Interfaces";
import fixUrl from "./utils";
// import FireWorks from "./FireWorks";
import "./HomePage.css";
function HomePage() {
  const [data, setData] = useState<Hamster | null>(null);
  async function getData(): Promise<void> {
    const response: Response = await fetch(fixUrl("/hamsters/cutest"));
    try {
      const data: Hamster[] | Hamster = await response.json();
      let hamster: Hamster;
      if (Array.isArray(data)) {
        hamster = data[Math.floor(Math.random() * data.length)];
      } else {
        hamster = data;
      }

      setData(hamster);
    } catch (e: any) {
      console.log(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <h1>Välkommen till Hamster Wars!</h1>
      <p>
        Rösta på den hamstern du tycker är sötast, under Galleri så du kan även
        ladda upp bilder på din egen hamster och se hur den står sig mot andras
        hamstrar
      </p>
      <p>Självklart finns det även historik och statistik på alla matcher</p>
      <p>Må sötaste hamster vinna!</p>
      <h3>Ledande hamster just nu</h3>
      <Cutest data={data} />
    </div>
  );
}

export default HomePage;
