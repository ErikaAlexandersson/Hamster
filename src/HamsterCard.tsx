import { Hamster } from "./Interfaces";
import { useEffect, useState } from "react";

interface Prop {
  data: Hamster;
  className: string;
  changeClassName: (id: string) => void;
}

function HamsterCard({ data, className, changeClassName }: Prop) {
  const [showOrHide, setShowOrHide] = useState(false);

  function switchClassName(id: any) {
    setShowOrHide(!showOrHide);
    changeClassName(id);
  }
  return (
    <div className="hamster-container">
      <h1>{data.name}</h1>

      <div className="grow-container">
        <div className="first-info">
          <p>Hover to zoom</p>
          <div className="img-container">
            <img src={`http://localhost:1337/img/${data.imgName}`} alt="" />
          </div>
          <div
            className={
              showOrHide ? "overflow-container-clicked" : "overflow-container"
            }
          >
            <div className="text-container">
              <p className="info" onClick={() => switchClassName(data.id)}>
                {showOrHide ? "v" : "i"}
              </p>
              <p>Ålder: {data.age}</p>
              <p>Gillar: {data.loves}</p>
              <p>Favoritmat: {data.favFood}</p>
              {showOrHide ? (
                <div className="animated-container">
                  <p className="animate__animated animate__fadeInLeft animate__delay-2s">
                    Antal spelade matcher: {data.games}
                  </p>
                  <p className="animate__animated animate__fadeInRight animate__delay-3s">
                    Antal vunna matcher: {data.wins}
                  </p>
                  <p className="animate__animated animate__fadeInLeft animate__delay-4s">
                    Antal förluster: {data.defeats}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HamsterCard;
