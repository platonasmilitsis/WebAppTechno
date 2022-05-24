import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Technology from "./pages/Technology";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home/technology" element={<Technology/>}/>

      </Routes>
    </Router>
  );
  
};

export default App;
