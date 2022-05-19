import { useEffect, useState } from "react";
import Cutest from "./Cutest";
import { Hamster } from "./Interfaces";
import fixUrl from "./utils";
// import FireWorks from "./FireWorks";
import "./HomePage.css";
function HomePage() {
  const [data, setData] = useState<Hamster | null>(null);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/cutest"));
      const apiData: Hamster[] = await response.json();
      console.log(fixUrl("/hamsters/cutest"));
      if (apiData !== null && apiData.length >= 1) {
        let random = Math.floor(Math.random() * apiData.length);
        let randomHamster = apiData[random];
        setData(randomHamster);
        return;
      }
    }
    getData();
  }, []);

  return (
    <div className="home">
      <h1>Välkommen till Hamster Wars!</h1>
      <p>
        Rösta på den hamstern du tycker är sötast, du kan även ladda upp bilder
        på din egen hamster och se hur den står sig mot andras hamstrar
      </p>
      <p>Må sötaste hamster vinna!</p>
      <h3>Ledande hamster just nu</h3>
      {/* <img
        id="trophy"
        className="animate__animated animate__rubberBand"
        src="/trophy.png"
        alt=""
      /> */}
      <Cutest data={data} />
    </div>
  );
}

export default HomePage;
