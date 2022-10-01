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
import { Navigate } from "react-router-dom";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import MyBids from "./pages/MyBids";
import MyProducts from "./pages/MyProducts";

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

          <Route element={<RequireAuth allowedRoles={["ACCEPTED"]}/>}> 
            <Route path="/home/my_bids" element={<MyBids/>}/>
          </Route>
          <Route element={<RequireAuth allowedRoles={["ACCEPTED"]}/>}> 
            <Route path="/home/my_products" element={<MyProducts/>}/>
          </Route>

        <Route path="/home/products" element={<Products/>}/>
        <Route path="/home/categories" element={<Categories/>}/>
        <Route path="/home/categories/:id/:name" element={<Category/>}/>
        <Route path="/home/categories/:id/:name/:product_id" element={<Product/>}/>
        <Route path="/register/Approval" element={<Approval/>}/>
        <Route path="/Map" element={<Map/>}/>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </Router>
  );
  
};

export default App;
