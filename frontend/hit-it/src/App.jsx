import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Technology from "./pages/Categories/Technology";
import HomeGarden from "./pages/Categories/HomeGarden";
import Fashion from "./pages/Categories/Fashion";
import HobbySports from "./pages/Categories/HobbySports";
import HealthBeauty from "./pages/Categories/HealthBeauty";
import Childrenry from "./pages/Categories/Childrenry";
import AutoMoto from "./pages/Categories/AutoMoto";
import Business from "./pages/Categories/Business";
import Product from "./pages/Product";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Approval from "./pages/Approval";

const App = () => {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home/technology" element={<Technology/>}/>
        <Route path="/home/home-garden" element={<HomeGarden/>}/>
        <Route path="/home/fashion" element={<Fashion/>}/>
        <Route path="/home/hobby-sports" element={<HobbySports/>}/>
        <Route path="/home/health-beauty" element={<HealthBeauty/>}/>
        <Route path="/home/childrenry" element={<Childrenry/>}/>
        <Route path="/home/auto-moto" element={<AutoMoto/>}/>
        <Route path="/home/business-b2b" element={<Business/>}/>
        <Route path="/home/products/product_id=:id" element={<Product/>}/>
        <Route path="/register/Approval" element={<Approval/>}/>
      </Routes>
    </Router>
  );
  
};

export default App;
