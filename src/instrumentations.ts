import { MusicDb } from "./app/lib/db";
declare global {
  var MDb : MusicDb;
}
global.MDb = new MusicDb();

export default function register() {
  global.MDb.connect();
}