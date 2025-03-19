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
  difficulty : string
}

export interface BaseEntity {
  id : number,
  name : string
}

export interface Instrument extends BaseEntity {}

export interface Difficulty extends BaseEntity {}

export interface Genre extends BaseEntity {}

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