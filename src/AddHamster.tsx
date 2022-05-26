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
  const [blur, setBlur] = useState("add-hamster");
  const [imgFile, setImgFile] = useState("");
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

  function blurAndShowOrHide() {
    setShowOrHide(!showOrHide);
    if (!showOrHide) {
      setBlur("add-hamster-blur");
    } else {
      setBlur("add-hamster");
    }
    setAge("");
    setName("");
    setLikes("");
    setFavFood("");
    setImgFile("");
  }

  function previewImage(e: any) {
    setImg(e.target.files[0]);
    setImgFile(URL.createObjectURL(e.target.files[0]));
  }

  function sendHamster() {
    if (img !== null) {
      uploadBytes(storageRef, img).then((snapshot) => {
        getDownloadURL(ref(storage, name)).then((url) => {
          newHamster.imgName = url;
          fetch(fixUrl("/hamsters"), {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newHamster),
          });
          getData();
        });
        setAge("");
        setName("");
        setFavFood("");
        setImg(null);
        setLikes("");
        setShowOrHide(!showOrHide);
        setBlur("add-hamster");
        setImgFile("");
      });
    }
  }
  async function getData() {
    const response: Response = await fetch(fixUrl("/hamsters/"));
    const apiData: any = await response.json();
    let data: any[] = apiData;
    dispatch(addHamster(apiData));
    dispatch(reRenderHamster(!reRenderData));
  }

  function movePlaceHolder(e: any) {
    e.target.parentNode.children[0].className = "floating-label-change";
  }

  return (
    <div className={blur}>
      <button onClick={() => blurAndShowOrHide()}>
        <span className="button_top">Lägg till hamster</span>
      </button>
      {showOrHide ? (
        <div className="add-form">
          <p className="close" onClick={() => blurAndShowOrHide()}>
            X
          </p>
          <div className="image-container">
            {imgFile ? (
              <img src={imgFile}></img>
            ) : (
              <label htmlFor="file-upload" className="custom-file-upload">
                <p className="custom-file-upload-btn">Ladda upp bild</p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => previewImage(e)}
                />
              </label>
            )}
          </div>

          <div className="input-wrapper">
            {nameIsValid ? (
              <span className="ok">&#10003;</span>
            ) : (
              <span className="compulsory">*</span>
            )}

            <div className="input-container">
              <span className="floating-label">Namn</span>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => movePlaceHolder(e)}
              />
            </div>
            {checkName(name) ? null : (
              <div className="error-message">
                <p>
                  Det ser ut som att du försöker skriva in något annat än ett
                  namn... Tänk på att du bara kan använda bokstäver eller
                  siffror
                </p>
              </div>
            )}
          </div>
          <div className="input-wrapper">
            {ageIsValid ? (
              <span className="ok">&#10003;</span>
            ) : (
              <span className="compulsory">*</span>
            )}
            <div className="input-container">
              <span className="floating-label">Ålder</span>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onFocus={(e) => movePlaceHolder(e)}
              />
            </div>
            {checkAge(age) ? null : (
              <div className="error-message">
                <p>
                  Det ser ut som att du försöker skriva in något annat än ett
                  tal, försök igen
                </p>
              </div>
            )}
            {Number(age) <= 5 ? null : (
              <div className="error-message">
                <p>
                  Oj, nu blev det konstigt! En hamster kan, vad vi vet inte bli
                  ädlre än 4,5 år gammal.
                </p>
                <p>Vänligen skriv in ett giltligt värde.</p>
              </div>
            )}
          </div>
          <div className="input-wrapper">
            {favFoodIsValid ? (
              <span className="ok">&#10003;</span>
            ) : (
              <span className="compulsory">*</span>
            )}
            <div className="input-container">
              <span className="floating-label">Favorit mat</span>
              <input
                type="text"
                value={favFood}
                onChange={(e) => setFavFood(e.target.value)}
                onFocus={(e) => movePlaceHolder(e)}
              />
            </div>
            {checkString(favFood) ? null : (
              <div className="error-message">
                <p>
                  Nämen... Maträtter kan enligt våra empiriska studier endast
                  innehålla bokstäver.
                </p>
                <p>Försök igen</p>
              </div>
            )}
          </div>
          <div className="input-wrapper">
            {likesIsValid ? (
              <span className="ok">&#10003;</span>
            ) : (
              <span className="compulsory">*</span>
            )}

            <div className="input-container">
              <span className="floating-label">Gillar att...</span>
              <input
                type="text"
                onChange={(e) => setLikes(e.target.value)}
                onFocus={(e) => movePlaceHolder(e)}
              />
            </div>
            {checkString(likes) ? null : (
              <div className="error-message">
                <p>Oops, endast bokstäver är tillåtna, vänligen försök igen</p>
              </div>
            )}
          </div>
          <button
            className="send"
            disabled={!isValid}
            onClick={() => sendHamster()}
          >
            Skicka in
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AddHamster;
