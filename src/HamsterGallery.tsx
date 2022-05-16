import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Hamster } from "./Interfaces";
import "./HamsterGallery.css";
import "animate.css";
import HamsterCard from "./HamsterCard";
function HamsterGallery() {
  const [data, setData] = useState<Hamster[] | null>(null);

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch("http://localhost:1337/hamsters/");
      const apiData: any = await response.json();
      let data: any[] = apiData;
      setData(apiData);
    }
    getData();
  }, []);

  function changeClassName(id: string) {
    setData(
      [...(data || [])].map((hamster) => {
        if (hamster.id === id) {
          return {
            ...hamster,
            className: "overflow-container-clicked",
          };
        } else {
          return {
            ...hamster,
            className: "overflow-container",
          };
        }
      })
    );
  }

  const hamsters = data?.map((hamster) => {
    return (
      <HamsterCard
        data={hamster}
        key={hamster.id}
        className={"overflow-container"}
        changeClassName={changeClassName}
      />
    );
  });

  return (
    <div className="hamster-gallery">
      <header>
        <h1>Galleriet</h1>
      </header>
      <main>{hamsters}</main>
    </div>
  );
}

export default HamsterGallery;
