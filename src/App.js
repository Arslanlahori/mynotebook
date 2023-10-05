import './App.css';
import {
  Route, Routes
} from "react-router-dom";
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notestate from './context/notes/Notestate';


function App() {
  return (
    <>
      <Notestate>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />

        </Routes>
      </Notestate>


    </>
  );
}

export default App;
