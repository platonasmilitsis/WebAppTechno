import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RequireAuth from "./components/Global/RequireAuth.jsx";
import IsLoggedIn from "./components/Global/IsLoggedIn";
import Approval from "./pages/Approval";
import Map from "./pages/Map";
import Error from "./pages/Error";
import Category from "./pages/Category";

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

        <Route path="/home/category_id=:id" element={<Category/>}/>
        <Route path="/home/products/product_id=:id" element={<Product/>}/>
        <Route path="/register/Approval" element={<Approval/>}/>
        <Route path="/Map" element={<Map/>}/>
      </Routes>

    </Router>
  );
  
};

export default App;
