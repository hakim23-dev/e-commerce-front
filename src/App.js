import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Card from "./pages/Card";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import RootLayout from "./layouts/RootLayout";
import SearchProducts from "./components/SearchProducts";
import WishList from "./pages/WishList";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./components/DashboardHome";
import DashboardProducts from "./components/DashboardProducts";
import Dashboardusers from "./components/Dashboardusers";
import DashboardOrders from "./components/DashboardOrders";
import UpdateProduct from "./components/UpdateProduct";
import AddProduct from "./components/AddProduct";
import PortectedRoutes from "./layouts/PortectedRoutes";

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>} >
        <Route  index element={<Login/>} />
        <Route  path="register" element={<Register/>} />

        <Route element={<PortectedRoutes/>} >
          <Route path="home" element={<Home/>}  />
          <Route path="collection" element={<Collection/>}  />
          <Route path="about" element={<About/>}  />
          <Route path="contact" element={<Contact/>}  />
          <Route path="product/:id" element={<ProductDetails/>}  />
          <Route path="card" element={<Card/>}  />
          <Route path="placeorder" element={<PlaceOrder/>}  />
          <Route path="order" element={<Order/>}  />
          <Route path="searchproducts" element={<SearchProducts/>}  />
          <Route path="wishlist" element={<WishList/>}  />
          <Route path="myProfile" element={<MyProfile/>}  />
        </Route>
        <Route path="*" element={<NotFound/>}  />
      </Route>
      
      <Route element={<Dashboard/>} >
        <Route path="dashboard" element={<DashboardHome/>} />
        <Route path="products" element={<DashboardProducts/>} />
        <Route path="updateProduct/:id" element={<UpdateProduct/>} />
        <Route path="users" element={<Dashboardusers/>} />
        <Route path="orders" element={<DashboardOrders/>} />
        <Route path="addProduct" element={<AddProduct/>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
