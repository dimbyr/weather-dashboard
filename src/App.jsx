import { useState, useEffect } from 'react';
import WeatherComponent from './components/WeatherComponent';
// import SearchBar from './components/SearchBar';
import './index.css';
import ToggleDark from './components/ToggleDark';
import Dashboard from './components/Dashboard';

function App() {
  const theme = localStorage.getItem('dark') === 'true' ? true : false;
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
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('dark', newDark); 
  }
  return (
    <div className={`flex flex-col justify-start items-center text-center h-screen py-0 ${dark ? 'bg-gray-800 text-slate-300' : 'bg-slate-200 text-gray-800'}`}>
      <header className='text-xl md:text-2xl font-bold flex flex-auto flex-row justify-between gap-16 items-center bg-green-600 rounded-b-lg w-screen md:px-40 py-0 my-0 text-white' >
        <div><p>{new Date().toLocaleString('en-US', {
                            weekday: 'short',  
                            day: 'numeric',    
                            month: 'short',    
                            year: 'numeric',   
                            hour: 'numeric',  
                            minute: 'numeric', 
                            hour12: true      
                          }
        )}</p></div>
        <div>
          <button onClick={handleDark}>
            <ToggleDark fill = {fill} xposition={xposition} color={color}/>
          </button>
        </div>
      </header>
    <main className='flex-auto rounded-lg p-4'>
      <Dashboard />
    </main>
    <footer className='flex items-center justify-center my-0 flex-auto bg-green-600 rounded-t-lg w-screen text-white'>
      <p>copyright &copy; dimbyr 2024</p>
    </footer>
    </div>
  )
}

export default App
