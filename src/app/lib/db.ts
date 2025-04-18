import mysql from "mysql2/promise";
import { TutorialPost, Tutorial, BaseEntity, Instrument, Difficulty, Song, Genre, User, Artist, TutorialCardInformation} from "./dbTypes";
import { errors } from "./Errors";

// Class för att kunna skapa en connection till mysql sidan
export class Db {
  protected dbConnection: mysql.Connection | undefined;

  public async connect(){
    if (this.dbConnection){
      throw new Error(errors.already_connected);      
    }

    this.dbConnection = await mysql.createConnection({ // Creates connection object
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB    
    });

    await this.dbConnection.connect(); // Establishes connection
  }

  public disconnect(){
    if (!this.dbConnection){
      throw new Error(errors.not_connected);
    }
    this.dbConnection.destroy();
  }

}

//Subclass som ärver Db och här finns alla olika methods som executar queries. Backend
export class MusicDb extends Db{

  public constructor() { // Skapar en instance av MusicDb
    super();
  }

  public async getEntityById<T extends BaseEntity>(tableName : String, id : number): Promise<T | null>{ // INJECTION RISK!!!
    try {
      if (!this.dbConnection) {
        throw new Error(errors.result_empty);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]> 
      (`
      SELECT *
      FROM ${tableName}
      WHERE ${tableName}Id = ${id};
      `);

      if (!rows || rows.length === 0) {
        return null;
      }

      return rows[0] as T;
    } catch (err) {
      console.error(err);
      throw new Error(errors.result_empty);
    }

  }

  //Tutorial
  public async getTutorialById(id : number): Promise<Tutorial>{
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
      SELECT * 
      FROM tutorial 
      WHERE tutorialId = ?;
      `, [id]);
      if (!rows || rows.length === 0) {
        throw new Error(errors.result_empty)
      }

      const tutorials = await Promise.all(
        rows.map(async (row : any) => {
          const instrument = await this.getEntityById<Instrument>("instrument", row.instrumentId);
          const difficulty = await this.getEntityById<Difficulty>("difficulty", row.difficulty);
          if (!instrument){
            throw new Error(errors.result_empty);
          }
          return {
            id : row.tutorialId,
            videoEmbed : row.embedVideoId,
            author : row.videoAuthor,
            instrument : instrument.instrument, 
            difficulty : difficulty != null ? difficulty.difficulty : null
          }

        })
      );
      return tutorials[0];
    } catch (err) {
      console.log(err);
      throw new Error(errors.result_empty);
    }
  } 

  public async getSongById(id : number): Promise<Song>{
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
        SELECT * 
        FROM song
        WHERE songId = ?
      `, [id]);
      if (!rows || rows.length === 0) {
        throw new Error(errors.result_empty);
      }

      const songs = await Promise.all(
        rows.map(async (row : any) => {
          const genre = await this.getEntityById<Genre>("genre", row.genreId);
          if (!genre){
            throw new Error(errors.result_empty);
          }
          return {
            id : row.songId,
            imagePath : row.coverImgPath,
            title : row.songTitle,
            artistId : row.artistId,
            genre : genre.genre,
            releaseYear : row.releaseYear
          }
        })
      );
      return songs[0];
    } catch (err){
      throw new Error(errors.result_empty);
    }
  }

  public async getAllTutorialPosts(): Promise<TutorialPost[]>{
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>("SELECT * FROM tutorialPost;");
      if (!rows || rows.length === 0) {
        throw new Error(errors.result_empty);
      }

      return rows.map((row : any) => ({
        tutorialPostId : row.tutorialPostId,
        songId : row.songId,
        tutorialId : row.tutorialId,
      }));
      
    } catch (err) {
      console.log(err);
      throw new Error(errors.result_empty);
    }
  }

  public async getAllTutorialInformationByIds(ids : TutorialPost[]): Promise<TutorialCardInformation[]>{
    try{
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      
      const tutorialList = [];

      for (let i = 0; i < ids.length; i++){
        const tutorialInfo = await musicDb.getTutorialById(ids[i].tutorialId);
        const songInfo = await musicDb.getSongById(ids[i].songId);

        const post = {
          id : ids[i].tutorialPostId,
          songTitle : songInfo.title,
          imagePath : songInfo.imagePath,
          songArtist : "a",
          releaseYear : songInfo.releaseYear,
          videoAuthor : tutorialInfo.author,
          instrument : tutorialInfo.instrument,
          difficulty : tutorialInfo.difficulty
        }

        tutorialList.push(post);
      }

      return tutorialList;

    } catch(err){
      throw new Error(errors.result_empty);
    }
  }

  public async getTutorialPostIdsById(id : number): Promise<TutorialPost>{
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>(
        `
        SELECT *
        FROM tutorialPost
        WHERE tutorialPostId = ?;
        `
      , [id]);

      const tutorial = rows.map((row : any) => ({
        tutorialPostId : row.tutorialPostId,
        songId : row.songId,
        tutorialId : row.tutorialId
      }));
      
      return tutorial[0];

    } catch (err){
      throw new Error(errors.result_empty);
    }
  }

  // User
  public async getUserInformationById(id : number): Promise<User>{
    try {
      if (!this.dbConnection) {
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
      SELECT *
      FROM user
      WHERE userId = ?;
      `, [id]);

      const user = rows.map((row : any) => ({
        id : row.userId,
        username : row.username,
        hashedPassword : row.password,
        mail : row.email,
        creationDate : row.creationDate
      }));

      return user[0];

    } catch (err) {
      throw new Error(errors.result_empty);
    }
  }

  public async getUserInformationByName(username : string): Promise<User>{
    try {
      if (!this.dbConnection) {
        throw new Error(errors.not_connected);
      }

      console.log(username);
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
      SELECT *
      FROM user
      WHERE username = ?;
      `, [username]);

      const user = rows.map((row : any) => ({
        id : row.userId,
        username : row.username,
        hashedPassword : row.password,
        mail : row.email,
        creationDate : row.creationDate
      }));
      return user[0];
    } catch (err) {
      throw new Error(errors.result_empty);
    }
  }

  public async getUserPasswordByName(username : string): Promise<string>{
    try {
      if (!this.dbConnection) {
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
      SELECT password
      FROM user
      WHERE username = ?;
      `, [username]);

      if (rows.length > 0){
        return rows[0].password;        
      } else{
        throw new Error(errors.result_empty);
      }
    } catch (err) {
      throw new Error(errors.result_empty);
    }
  }

  public async getVerifiedArtistById(userId : number): Promise<Artist | Boolean>{
    try {
      if (!this.dbConnection) {
        throw new Error(errors.not_connected);
      }
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      (`
        SELECT *
        FROM verifiedArtist
        WHERE artistId = ?;
      `, [userId])
      const artist = rows.map((row : any) => ({
        id : row.artistId,
        name : row.artistName
      }));
      return artist[0];
    } catch (err) {
      console.log("User is not verified artist");
      return false;
    }
  }

  public async newRegisteredUser(userInfo : User){ // check again for return type
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }

      await this.dbConnection.execute
      (`
      INSERT INTO user (username, password, mail, creationDate)
      VALUES (?, ?, ?, ?);
      `, [userInfo.username, userInfo.hashedPassword, userInfo.mail, userInfo.creationDate]);

    }catch (err) {
    throw new Error(errors.input_nan);
    }
  } 

  // Profile

  public async getUserSongListById(id : number): Promise<TutorialCardInformation[]> {
    try {

      if(!this.dbConnection){
        throw new Error(errors.not_connected);
      }
      const songList = [];     
      console.log("id", id); 
      const [rows] = await this.dbConnection.execute<mysql.RowDataPacket[]>
      ("SELECT * FROM userSongList WHERE userId = ?", [id]);
      console.log("row length" ,rows.length);
      for (let i = 0; i < rows.length; i++){
        console.log(rows[i]);
        const tutorialInfo = await musicDb.getTutorialById(rows[i].tutorialId);
        const songInfo = await musicDb.getSongById(rows[i].songId);

        const post = {
          id : rows[i].tutorialPostId,
          songTitle : songInfo.title,
          imagePath : songInfo.imagePath,
          songArtist : "a",
          releaseYear : songInfo.releaseYear,
          videoAuthor : tutorialInfo.author,
          instrument : tutorialInfo.instrument,
          difficulty : tutorialInfo.difficulty
        }

        songList.push(post);
      }
      return songList;

    } catch (err){
      console.error(err);
      return [];
    }
  }

  public async addSongToUserSongList(postId : number, userId : number) {
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }

      await this.dbConnection.execute(`
      INSERT INTO userSongList (tutorialPostId, userId)
      VALUES (?, ?);
      `, [postId, userId]);

    } catch (err) {
      console.error(err);
      throw new Error(errors.result_empty);
    }
  }

  public async removeSongFromUserSongList(postId : number, userId : number) {
    try {
      if (!this.dbConnection){
        throw new Error(errors.not_connected);
      }

      await this.dbConnection.execute(`
      DELETE FROM userSongList
      WHERE tutorialPostId = ? AND userId = ?;
      `, [postId, userId]);

    } catch (err) {
      console.error(err);
      throw new Error(errors.result_empty);
    }
  }
}


export const musicDb = new MusicDb();

musicDb.connect();