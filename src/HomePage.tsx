import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Cutest from "./Cutest";
import { Hamster } from "./Interfaces";
import FireWorks from "./FireWorks";
import "./HomePage.css";
function HomePage() {
  const [data, setData] = useState<Hamster[] | null>(null);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(
        "http://localhost:1337/hamsters/cutest"
      );
      const apiData: any = await response.json();
      let data: any[] = apiData;

      if (data.length > 1 && data !== null) {
        let random = Math.floor(Math.random() * data.length);
        setData((data) => [...data, apiData[random] as Hamster]);
        // setData(newData);
        return;
      }
      setData(apiData);
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
      <FireWorks />
    </div>
  );
}

export default HomePage;
