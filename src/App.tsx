import React, {useState, useEffect} from 'react';
import './App.css';
import Cell from "./components/cell";
import Footer from "./components/footer";

function App() {
    const [dotPosition, setDotPosition] = useState<number | null>(0);
    useEffect(() => {
        console.log(`from parent ${dotPosition}`);
    }, [dotPosition]);


  return (
    <div className="App" style={{width: "900px"}}>
      <Cell num={1} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)} />
      <Cell num={2} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
      <Cell num={3} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
        <Cell num={4} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
        <Cell num={5} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
        <Cell num={6} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
        <Cell num={7} lastPosition={dotPosition} onInFrame={(pos: number|null) => setDotPosition(pos)}/>
      {/*<Cell num={4} lastPosition={dotPosition} onInFrame={(pos: number) => setDotPosition(pos)}/>*/}
      {/*<Cell num={5} lastPosition={dotPosition} onInFrame={(pos: number) => setDotPosition(pos)}/>*/}
      <Footer/>
    </div>
  );
}

export default App;
