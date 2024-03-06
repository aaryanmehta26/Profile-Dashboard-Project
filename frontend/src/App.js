import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPosts from "./screens/MyPosts/MyPosts";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  return (
    <BrowserRouter>
    
      <Header />
      <main>
      <Routes>
        <Route path="/" Component={LandingPage}/>
        <Route path="/login" Component={LoginScreen}/>
        <Route path="/register" Component={RegisterScreen}/>
        <Route path="/profile" Component={ProfileScreen}/>
        <Route path="/myposts" Component={MyPosts} />
        </Routes>
      </main>
      <Footer />
      
    </BrowserRouter>
  );
}

export default App;
