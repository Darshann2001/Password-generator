import { useState } from 'react'
import './App.scss'
import Checkbox from './component/Checkbox.jsx';
import Star from './component/Star.jsx';
function App() {
  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  })
  const [handelText, sethandelText] = useState('')
  const [copied, setCopied] = useState(false);

  const handelUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase
    })
  }

  const handelLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase
    })
  }

  const handelNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers
    })
  }

  const handelSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols
    })
  }

  const setPasswordLength = (value) => {
    setPassword({
      ...password,
      length: value
    })
  }

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = password;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      sethandelText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className="wrapper">
      <Star />
      <div className="container wrapper-box">
        <h2 className='labelStyle'>Paswword Generator</h2>
        <div className="password-box">
          <input type="text" value={handelText} placeholder='' onChange={(e) => sethandelText(e.target.value)} autoComplete='off' />
          <button className='copy-button' onClick={() => {
            if (handelText.length > 0) {
              navigator.clipboard.writeText(handelText);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 1000);
            }
          }}>{copied ? 'Copied' : 'Copy text'}</button>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label className='labelStyle'>Password Length</label>
          </div>
          <div>
            <input type="number" min='5' value={password.length} onChange={(e) => setPasswordLength(e.target.value)} />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label className='labelStyle'>Include uppercase letters</label>
          </div>
          <div>
            <Checkbox value={password.uppercase} onChange={handelUppercase} />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label className='labelStyle'>Include lowercase letters</label>
          </div>
          <div>
            <Checkbox value={password.lowercase} onChange={handelLowercase} />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label className='labelStyle'>Include numbers</label>
          </div>
          <div>
            <Checkbox value={password.numbers} onChange={handelNumbers} />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label className='labelStyle'>Include Symbols</label>
          </div>
          <div>
            <Checkbox value={password.symbols} onChange={handelSymbols} />
          </div>
        </div>
        <div>
          <button className='generate-btn' onClick={generatePassword}>Generate Password</button>
        </div>
      </div>
    </div>
  )
}

export default App
