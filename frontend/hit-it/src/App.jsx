import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
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
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RequireAuth from "./components/Global/RequireAuth.jsx";
import IsLoggedIn from "./components/Global/IsLoggedIn";
import Approval from "./pages/Approval";
import Map from "./pages/Map";
import Error from "./pages/Error";

const App = () => {

  return(
    <Router>
      <Routes>

        <Route element={<IsLoggedIn/>}>
          <Route path="/" element={<Welcome/>}/>
        </Route>
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/error" element={<Error/>}/>

        <Route path="/home" element={<Home/>}/>



          <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}> 
            <Route path="/admin" element={<Admin/>}/>
          </Route>


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
        <Route path="/Map" element={<Map/>}/>
      </Routes>

    </Router>
  );
  
};

export default App;
