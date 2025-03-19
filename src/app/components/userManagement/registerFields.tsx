interface RegisterProps{
  idName : string;
}

export default function RegisterFields({ idName } : RegisterProps){
  return (
    <div>
      <input type="text" id={idName}/>
    </div>
  );
}