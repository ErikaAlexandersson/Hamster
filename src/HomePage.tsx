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
      console.log(apiData);
      let sortedArray = apiData.sort((a, b) => b.wins - a.wins);
      let random = Math.floor(Math.random() * 1);
      if (sortedArray[0].wins === sortedArray[1].wins || sortedArray[2].wins) {
        setData(sortedArray[random]);
      } else {
        setData(sortedArray[0]);
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
      <Cutest data={data} />
    </div>
  );
}

export default HomePage;
