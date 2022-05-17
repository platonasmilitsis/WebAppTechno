import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
  
};

export default App;
