import { useState, useEffect } from 'react';
import WeatherComponent from './components/WeatherComponent';
// import SearchBar from './components/SearchBar';
import './index.css';
import ToggleDark from './components/ToggleDark';
import Dashboard from './components/Dashboard';

function App() {
  const theme = localStorage.getItem('dark') || false;
  const [dark, setDark] = useState(theme);
  const [fill, setFill] = useState("#666"); // set to #FFF when dark mmode is on
  const [xposition, setXposition] = useState(5); //set to 40 when dark mode is on
  const [color, setColor] = useState('#FFF'); // set to #666 when dark mode is on
  useEffect(() => {
    if (dark) {
      setFill('#FFF');
      setXposition(40);
      setColor("#666");
    } else {
      setFill('#666');
      setXposition(5);
      setColor("#FFF");
    }
  }, [dark]); // Effect runs whenever `dark` changes
  const handleDark = () => {
    setDark(!dark);
    localStorage.setItem('dark', dark);
  }
  return (
    <div className={`p-40 flex flex-col justify-center text-center ${dark ? 'bg-gray-800 text-slate-300' : 'bg-slate-200 text-gray-800'}`}>
      <h1>City Weather</h1>
      <div className='flex flex-row justify-center'>
        <div>{new Date().toLocaleString()}</div>
        <button onClick={handleDark}>
          <ToggleDark fill = {fill} xposition={xposition} color={color}/>
        </button>
      </div>
    <Dashboard />
    {/* <WeatherComponent /> */}
    </div>
  )
}

export default App
