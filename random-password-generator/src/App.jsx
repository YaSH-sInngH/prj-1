import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(6)
  const [addNumber, setAddNumber] = useState(false)
  const [addCharacter, setAddCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(addNumber){
      str+="0123456789"
    }
    if(addCharacter){
      str+="!@#$%^&*()-_=+{}[]:;'?/.>,<~|/"
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, addCharacter, addNumber])

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, addCharacter, addNumber, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray text-blue-500 bg-gray-500">
        <h1 className="text-white text-center my-2 text-2xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value={password}
          className="outline-none w-full py-1 px-3 text-red-500"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordtoClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0"
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className="text-white">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked = {addNumber}
              id="numberInput"
              onChange={()=>{
                setAddNumber((prev)=>!prev)
              }}
            />
            <label htmlFor="numberInput" className="text-white">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked = {addCharacter}
              id="characterInput"
              onChange={()=>{
                setAddCharacter((prev)=>!prev)
              }}
            />
            <label htmlFor="characterInput" className="text-white">Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
