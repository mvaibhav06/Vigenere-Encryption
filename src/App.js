import "./App.css";
import { useState } from "react";
import CryptoJS from "crypto-js";

function App() {
  const [selectedOption, setSelectedOption] = useState("encrypt");
  const [input, setInput] = useState("");
  const [key, setKey] = useState("Good fortune");
  const [out, setOut] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "encrypt") {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(input, key).toString();
    setOut(encrypted);
  };

  const handleDecrypt = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(input, key).toString(
        CryptoJS.enc.Utf8
      );
      setOut(decrypted);
    } catch (error) {
      console.log("Error in decrytping text", error);
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);

    if (selectedOption === "encrypt") {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  return (
    <div className="App">
      <h1>Vigenere Encryption</h1>
      <input
        type="radio"
        value="encrypt"
        checked={selectedOption === "encrypt"}
        onChange={handleChange}
        name="btn"
      />
      Encrypt&nbsp;&nbsp;
      <input
        type="radio"
        value="decrypt"
        onChange={handleChange}
        checked={selectedOption === "decrypt"}
        name="btn"
      />
      Decrypt
      <br />
      <textarea className="my-3 area" value={input} onChange={handleInput} />
      <br />
      <label>Secret Key: </label>
      <input
        className="mx-2"
        value={key}
        onChange={(event) => setKey(event.target.value)}
      />
      <div className="out my-5 ">
        <h4 style={{ paddingTop: "10px" }}>Your Encrypted Message</h4>
        <p className="px-3 my-2 output" style={{ textAlign: "left" }}>
          {out}
        </p>
      </div>
    </div>
  );
}

export default App;
