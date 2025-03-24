interface ButtonProps {
  buttonFunc : () => void;
  buttonText? : string;
}

export default function Button({ buttonFunc, buttonText } : ButtonProps){
  return (
    <button onClick={buttonFunc} className="border hover:bg-amber-50">
      {buttonText}
    </button>

  );
}