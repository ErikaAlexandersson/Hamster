import { useState } from "react";
import "./AddHamster.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./FireBaseFrontEnd";

function AddHamster() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [favFood, setFavFood] = useState("");
  const [likes, setLikes] = useState("");
  const [img, setImg] = useState<Blob | null>(null);

  const nameIsValid = name !== "";
  const ageIsValid = Number(age) > 1;
  const favFoodIsValid = favFood !== "";
  const likesIsValid = likes !== "";

  const isValid = nameIsValid && ageIsValid && favFoodIsValid && likesIsValid;

  const storage = getStorage(app);
  const storageRef = ref(storage, name);

  const newHamster = {
    name: name,
    age: Number(age),
    wins: 0,
    defeats: 0,
    loves: likes,
    favFood: favFood,
    games: 0,
    imgName: "",
  };

  function sendHamster() {
    if (img !== null) {
      uploadBytes(storageRef, img).then((snapshot) => {
        console.log("Uppladdat och klart");
      });
    }
  }

  return (
    <div className="add-hamster">
      <button>Ladda upp en egen hamster</button>
      <div className="add-form">
        <input
          type="text"
          value={name}
          placeholder="Namn"
          onChange={(event: any) => setName(event.target.value)}
        />
        <input
          type="text"
          value={age}
          placeholder="Ålder"
          onChange={(event: any) => setAge(event.target.value)}
        />
        <input
          type="text"
          value={favFood}
          placeholder="Favoritmat"
          onChange={(event: any) => setFavFood(event.target.value)}
        />
        <input
          type="text"
          value={likes}
          placeholder="Gillar"
          onChange={(event: any) => setLikes(event.target.value)}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event: any) => setImg(event.target.value)}
        />
        <button disabled={!isValid} onClick={() => sendHamster()}>
          Skicka in
        </button>
      </div>
    </div>
  );
}

export default AddHamster;
