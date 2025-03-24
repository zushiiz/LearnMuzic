export interface TutorialPost {
  tutorialPostId : number,
  songId : number,
  tutorialId : number
}

export interface Tutorial {
  id : number,
  videoEmbed : string,
  author : string,
  instrument : string,
  difficulty : string | null
}

export interface BaseEntity {
  id : number,
}

export interface Instrument extends BaseEntity {
  instrument : string
}

export interface Difficulty extends BaseEntity {
  difficulty : string
}

export interface Genre extends BaseEntity {
  genre : string
}

export interface Song {
  id : number,
  imagePath : string,
  title : string,
  genreId : number,
  releaseYear : number
}

export interface User {
  id : number,
  username : string,
  hashedPassword : string,
  mail : string,
  creationDate : string
}

export interface Artist {
  id : number,
  name : string
}