import { useState } from "react";
import "./AddHamster.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./FireBaseFrontEnd";
import fixUrl from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { addHamster } from "./state/features/hamsterSlice";
import { Hamster } from "./Interfaces";
import { reRenderHamster } from "./state/features/reRenderSlice";

function AddHamster() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [favFood, setFavFood] = useState("");
  const [likes, setLikes] = useState("");
  const [img, setImg] = useState<Blob | null>(null);
  const hamsterData = useSelector((state: RootState) => state.hamster.value);
  const reRenderData = useSelector((state: RootState) => state.reRender.value);
  const [showOrHide, setShowOrHide] = useState(false);
  const [placeholderMove, setPlaceholderMove] = useState("0");
  let okOrNot = <p className="check">&#10003;</p>;

  const dispatch = useDispatch();

  const nameIsValid = checkName(name) && name !== "";
  const ageIsValid = checkAge(age) && Number(age) < 5 && age !== "";
  const favFoodIsValid = checkString(favFood) && favFood !== "";
  const likesIsValid = checkString(likes) && likes !== "";
  const imgIsValid = img !== null;

  const isValid =
    nameIsValid && ageIsValid && favFoodIsValid && likesIsValid && imgIsValid;

  const storage = getStorage(app);
  const storageRef = ref(storage, name);

  if (
    checkString(favFood) === false ||
    checkAge(age) === false ||
    checkName(name) === false ||
    checkString(likes) === false
  ) {
    okOrNot = <p className="error">!</p>;
  }

  function checkName(input: string) {
    let regex = /^[0-9a-zA-ZäöåÄÖÅ]*[0-9a-zA-ZZäöåÄÖÅ ]*$/;
    return regex.test(input);
  }
  function checkString(input: string) {
    let regEx = /^[a-zA-ZäöåÄÖÅ _]*$/;
    return regEx.test(input);
  }
  function checkAge(input: string) {
    let regEx = /^[0-9]*$/;
    return regEx.test(input);
  }

  const newHamster = {
    name: name,
    age: Number(age),
    favFood: favFood,
    loves: likes,
    imgName: "",
    wins: 0,
    defeats: 0,
    games: 0,
  };

  function sendHamster() {
    console.log(img);
    if (img !== null) {
      uploadBytes(storageRef, img).then((snapshot) => {
        console.log("Uppladdat och klart");
        getDownloadURL(ref(storage, name)).then((url) => {
          newHamster.imgName = url;
          console.log("New Hamster innuti getDownLoad", newHamster);
          fetch(fixUrl("/hamsters"), {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newHamster),
          });
          console.log(
            "New Hamster efter POST, nästa steg dispatch",
            newHamster
          );
          getData();
        });
        setAge("");
        setName("");
        setFavFood("");
        setImg(null);
        setLikes("");
        setShowOrHide(!showOrHide);
      });

      console.log(newHamster);
    }
  }
  async function getData() {
    const response: Response = await fetch(fixUrl("/hamsters/"));
    const apiData: any = await response.json();
    let data: any[] = apiData;
    dispatch(addHamster(apiData));
    dispatch(reRenderHamster(!reRenderData));
  }

  function checkClick(e: any) {
    console.log(e.target.parentNode.children[1]);
    e.target.parentNode.children[1].className = "changePlaceHolder";
    console.log("click fungerar");
    setPlaceholderMove("20");
  }

  return (
    <div className="add-hamster">
      <button onClick={() => setShowOrHide(!showOrHide)}>
        Ladda upp en egen hamster
      </button>
      {showOrHide ? (
        <div className="add-form">
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(event: any) => setName(event.target.value)}
              onClick={(e) => checkClick(e)}
            />
            <span
              className="floating-label"
              style={{ marginTop: `${placeholderMove}` }}
            >
              Namn
            </span>
            {name === "" ? <p>*</p> : <>{okOrNot}</>}
            {checkName(name) ? null : (
              <div className="error-message">
                <p>
                  Oj oj, nu blev det lite fel. Namnet kan bara innehålla
                  bokstäver
                </p>
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              className="inputText"
              type="text"
              value={age}
              onClick={(e) => checkClick(e)}
              onChange={(event: any) => setAge(event.target.value)}
            />
            <span
              className="floating-label"
              style={{ marginTop: `${placeholderMove}` }}
            >
              Ålder
            </span>
            {age === "" ? <p>*</p> : <>{okOrNot}</>}
            {checkAge(age) ? null : (
              <div className="error-message">
                <p>
                  Det ser ut som du försöker skriva in något annat än en
                  ålder... Prova igen Tänk på att bara använda siffror
                </p>
              </div>
            )}
            {Number(age) > 5 ? (
              <div className="error-message">
                <p>
                  Oj! Det var en gammal hamster, så vitt vi vet så är den idag
                  älsta levande hamstern 4,5 år gammal.
                </p>
                <p> Vänligen skriv in en giltlig ålder</p>
              </div>
            ) : null}
          </div>
          <div className="input-container">
            <input
              value={favFood}
              onChange={(event: any) => setFavFood(event.target.value)}
              type="text"
              onClick={(e) => checkClick(e)}
            />
            <span
              className="floating-label"
              style={{ marginTop: `${placeholderMove}` }}
            >
              Favoritmat
            </span>
            {favFood === "" ? <p>*</p> : <>{okOrNot}</>}
            {checkString(favFood) ? null : (
              <div className="error-message">
                <p>
                  Det ser ut som att du försöker skriva in något annat än mat...
                </p>
                <p>Prova igen och tänk på att du bara kan använda bokstäver.</p>
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              value={likes}
              onChange={(event: any) => setLikes(event.target.value)}
              type="text"
              onClick={(e) => checkClick(e)}
            />
            <span
              className="floating-label"
              style={{ marginTop: `${placeholderMove}` }}
            >
              Tycker om att...
            </span>
            {likes === "" ? <p>*</p> : <>{okOrNot}</>}
            {checkString(likes) ? null : (
              <div className="error-message">
                <p>
                  Gillar skrivs in med bokstäver och kan inte innehålla en länk
                </p>
              </div>
            )}
          </div>
          <div className="img-upload">
            <h3>Ladda upp en bild</h3>
            {imgIsValid ? <p>Tillåtna filer är: jpg, jpeg, png</p> : null}
            <input
              type="file"
              name="img"
              id="img"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event: any) => setImg(event.target.files[0])}
            />
          </div>

          <button disabled={!isValid} onClick={() => sendHamster()}>
            Skicka in
          </button>
          {isValid ? null : <p>Alla fälten måste fyllas i</p>}
        </div>
      ) : null}
    </div>
  );
}

export default AddHamster;
