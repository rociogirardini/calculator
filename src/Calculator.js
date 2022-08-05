import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const Calculator = () => {
  const numbers = [
    {
      number: 7,
      id: "seven",
      key: "7",
    },
    {
      number: 8,
      id: "eight",
      key: "8",
    },
    {
      number: 9,
      id: "nine",
      key: "9",
    },
    {
      number: 4,
      id: "four",
      key: "4",
    },
    {
      number: 5,
      id: "five",
      key: "5",
    },
    {
      number: 6,
      id: "six",
      key: "6",
    },
    {
      number: 1,
      id: "one",
      key: "1",
    },
    {
      number: 2,
      id: "two",
      key: "2",
    },
    {
      number: 3,
      id: "three",
      key: "3",
    },
    {
      number: 0,
      id: "zero",
      key: "0",
    },
  ];
  const operations = [
    {
      operator: "/",
      className: "purple",
    },
    { operator: "*", className: "red", id: "multiply" },
    {
      operator: "-",
      className: "blue",
    },
    {
      operator: "+",
      className: "green",
    },
    {
      operator: "=",
      className: "orange",
    },
  ];

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const updateCalc = (value) => {
    // Avoid duplicates
    const canAddCharacter = (value, character) => {
      let hasDecimal = value.includes(".");
      let canAdd;
      switch (character) {
        case ".":
          if (hasDecimal) canAdd = false;
          break;

        case "0":
          if (!hasDecimal && value !== "0") canAdd = false;
          break;

        default:
          canAdd = true;
          break;
      }
      return canAdd;
    };

    // Calc validation (only 1 operator)
    let stopCalc = false;
    operations.forEach((op) => {
      if (
        (op.operator.includes(value) && calc === "") ||
        (op.operator.includes(value) && op.operator.includes(calc.slice(-1)))
      ) {
        stopCalc = true;
      }
    });
    if (stopCalc) return;
    setCalc(calc + value);

    // Update preview calculation

    operations.forEach((op) => {
      if (!op.operator.includes(value)) {
        setResult((Math.round(eval(calc + value) * 10000) / 10000).toString());
      }
    });
  };

  // Update everything

  const calculate = () => {
    if (calc === "") {
      return calc;
    }
    setCalc((Math.round(eval(calc) * 10000) / 10000).toString());
    setResult("");
  };

  // Delete one character

  const deleteLast = () => {
    if (calc === "") {
      return;
    } else {
      const value = calc.slice(0, -1);
      setCalc(value);
    }
  };

  // Delete everything

  const deleteAll = () => {
    setCalc("");
    setResult("");
  };

  // Adding keypress functionality and styling buttons on keypress

  const handleKeypress = (e) => {
    let numbsKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let opsKeys = ["/", "*", "-", "+", "."];

    if (e.key === "Enter") {
      calculate();
      document.getElementById("=").style.transform = "scale(0.97)";
      setTimeout(() => {
        document.getElementById("=").style.transform = "";
      }, 100);
    }
    if (e.key === "Backspace") {
      deleteLast();
      document.getElementById("Backspace").style.transform = "scale(0.97)";
      setTimeout(() => {
        document.getElementById("Backspace").style.transform = "";
      }, 100);
    }
    if (numbsKeys.indexOf(e.key) >= 0) {
      updateCalc(parseInt(e.key));
      let numPressed = e.key;
      document.getElementById(numPressed).style.transform = "scale(0.97)";
      setTimeout(() => {
        document.getElementById(numPressed).style.transform = "";
      }, 100);
    }
    if (opsKeys.indexOf(e.key) >= 0) {
      if(e.key === "."){
        updateCalc(e.key);
        document.getElementById("decimal").style.transform = "scale(0.97)";
        setTimeout(() => {
          document.getElementById("decimal").style.transform = "";
        }, 100);
      } else{
        updateCalc(e.key);
        let opPressed = e.key;
        document.getElementById(opPressed).style.transform = "scale(0.97)";
        setTimeout(() => {
          document.getElementById(opPressed).style.transform = "";
        }, 100);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <div>
      <div className="container">
        <div className="display">
          {calc || "0"} {result ? <span>({result})</span> : <span>(0)</span>}
        </div>
        <div className="numbsContainer">
          <button className="big-w orange" id="clear" onClick={deleteAll}>
            AC
          </button>
          <button onClick={deleteLast} id="Backspace">
            <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
          {numbers.map((num) => (
            <button
              key={num.id}
              id={num.number}
              className={`${num.number === 0 && "big-w"}`}
              onClick={() => updateCalc(num.number.toString())}
            >
              {num.number}
            </button>
          ))}
          <button onClick={() => updateCalc(".")} id="decimal">
            .
          </button>
        </div>
        <div className="opsContainer">
          {operations.map((op) => (
            <button
              id={op.operator}
              key={op.id}
              className={op.className}
              onClick={
                op.operator === "="
                  ? calculate
                  : () => updateCalc(`${op.operator}`)
              }
            >
              {op.operator === "*" ? "x" : op.operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
