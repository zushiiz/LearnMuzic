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

  public async getEntityById<T extends BaseEntity>(tableName : String, id : number): Promise<T | null>{

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
      throw new Error(errors.result_empty);
    }

  }

  //Tutorial
  public async getTutorialById(id : number): Promise<Tutorial[]>{
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
          const difficulty = await this.getEntityById<Difficulty>("difficulty", row.difficultyId);
          if (!instrument){
            throw new Error(errors.result_empty);
          }
          return {
            id : row.tutorialId,
            videoEmbed : row.embedVideoLink,
            author : row.videoAuthor,
            instrument : instrument.instrument, 
            difficulty : difficulty != null ? difficulty.difficulty : null
          }

        })
      );
      return tutorials;
    } catch (err) {
      console.log(err);
      throw new Error(errors.result_empty);
    }
  } 

  public async getSongById(id : number): Promise<Song[]>{
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
      return songs;
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
      
      const newList = [];

      for (let i = 0; i < ids.length; i++){
        const tutorialInfo = await musicDb.getTutorialById(ids[i].tutorialId);
        const songInfo = await musicDb.getSongById(ids[i].songId);

        console.log(tutorialInfo[0]);
        console.log(songInfo[0]);

        const post = {
          songTitle : songInfo[0].title,
          imagePath : songInfo[0].imagePath,
          songArtist : "a",
          releaseYear : songInfo[0].releaseYear,
          videoAuthor : tutorialInfo[0].author,
          instrument : tutorialInfo[0].instrument,
          difficulty : tutorialInfo[0].difficulty
        }

        newList.push(post);
      }

      return newList;

    } catch(err){
      throw new Error(errors.result_empty);
    }
  }

  // User
  public async getUserInformationById(id : number): Promise<User[]>{
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

      return rows.map((row : any) => ({
        id : row.userId,
        username : row.username,
        hashedPassword : row.password,
        mail : row.email,
        creationDate : row.creationDate
      }));
    } catch (err) {
      throw new Error(errors.result_empty);
    }
  }

  public async getUserInformationByName(username : string): Promise<User[]>{
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

      return rows.map((row : any) => ({
        id : row.userId,
        username : row.username,
        hashedPassword : row.password,
        mail : row.email,
        creationDate : row.creationDate
      }));
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

  public async getVerifiedArtist(userId : number): Promise<Artist[] | Boolean>{
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
      return rows.map((row : any) => ({
        id : row.artistId,
        name : row.artistName
      }));
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
      INSERT INTO user (username, password, email, creationDate)
      VALUES (?, ?, ?, ?);
      `, [userInfo.username, userInfo.hashedPassword, userInfo.mail, userInfo.creationDate]);

    }catch (err) {
    throw new Error(errors.input_nan);
    }
  } 

}


export const musicDb = new MusicDb();

musicDb.connect();