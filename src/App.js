import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const OTP_DIGIT_COUNT = 4;
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGIT_COUNT).fill(null)
  );
  const refArr = useRef([]);
  const handleInputChange = (e, ind) => {
    if (!isNaN(e.target.value) && e.target.value !== " ") {
      setInputArr((prev) => {
        const newArr = [...prev];
        newArr[ind] = e.target.value.trim().slice(-1);
        return newArr;
      });
      if (ind < OTP_DIGIT_COUNT - 1 && e.target.value !== "") {
        console.log("e: ", e, ind);
        refArr.current[ind + 1].focus();
      }
    }
  };
  useEffect(() => {
    refArr.current[0].focus();
  }, []);
  return (
    <div className="App">
      <h1>OTP Input</h1>
      <div className="container">
        {inputArr?.map((_, idx) => {
          return (
            <input
              key={idx}
              id={idx}
              ref={(input) => (refArr.current[idx] = input)}
              value={inputArr[idx]}
              onChange={(e) => handleInputChange(e, idx)}
              onKeyDown={(e) =>
                e.key == "Backspace" &&
                idx > 0 &&
                e.target.value == "" &&
                refArr.current[idx - 1].focus()
              }
              className="input"
            />
          );
        })}
      </div>
    </div>
  );
}
