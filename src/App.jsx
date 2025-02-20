/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, SetLength] = useState(8);
  const [numAllowed, SetnumAllowed] = useState(false);
  const [charAllowed, SetcharAllowed] = useState(false);
  const [password, SetPassword] = useState("");
  const passRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "&^%$#@!*{[]}";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPasstoClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }, [password]);

  useEffect(() => {
    passwordgenerator();
  }, [length, charAllowed, numAllowed, passwordgenerator]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-orange-400">
          Password Generator
        </h1>

        <div className="flex items-center bg-gray-700 rounded-lg p-2 shadow">
          <input
            type="text"
            value={password}
            className="w-full bg-transparent text-lg px-3 py-2 outline-none text-white placeholder-gray-400"
            placeholder="Generated Password"
            readOnly
            ref={passRef}
          />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={copyPasstoClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer w-2/3 accent-orange-500"
              onChange={(e) => SetLength(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-lg">
              Include Numbers
            </label>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              className="w-5 h-5 accent-orange-500"
              onChange={() => SetnumAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-lg">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="w-5 h-5 accent-orange-500"
              onChange={() => SetcharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
