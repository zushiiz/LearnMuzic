interface ButtonProps {
  buttonFunc : () => void;
}

export default function Button({ buttonFunc } : ButtonProps){
  return (
    <button onClick={buttonFunc} className="border hover:bg-amber-50">
      CLICK
    </button>

  );
}