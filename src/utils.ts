import { response } from "express";
import { Hamster } from "./Interfaces";

function fixUrl(url: string): string {
  if (import.meta.env.MODE === "development") {
    // console.log("DEV MODE");
    return "http://localhost:1337" + url;
  } else {
    console.log("PRODUCTION MODE");

    return url;
  }
}

function fixImgUrl(name: string) {
  if (name.includes("https://firebasestorage")) {
    return name;
  } else {
    return fixUrl(`/img/${name}`);
  }
}
export { fixImgUrl };
export default fixUrl;
