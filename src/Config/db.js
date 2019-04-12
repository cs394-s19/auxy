import { DB_CONFIG } from "./config";
import firebase from "firebase/app";
import "firebase/database";

const app = firebase.initializeApp(DB_CONFIG);
const database = app.database().ref();

export default database;
