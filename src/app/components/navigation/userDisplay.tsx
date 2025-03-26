interface UserDisplayProps{
  name? : string,
  password? : string,
  mail? : string,
  date? : string
}

export default function userDisplay( { name, password, mail, date} : UserDisplayProps ){
  return (
    <ul>
      <li>{name}</li>
      <li>{password}</li>
      <li>{mail}</li>
      <li>{date}</li>
    </ul>
  );
}