import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Overlay from "./Overlay";

function Spinner() {
  return (
    <Overlay>
      <AiOutlineLoading3Quarters className="mx-auto animate-spin text-9xl text-white" />
    </Overlay>
  );
}

export default Spinner;
