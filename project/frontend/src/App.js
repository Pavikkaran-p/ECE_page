import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Pagenotfount from "./Pages/Pagenotfount";
import Dashboard from "./Pages/Dashboard";
import VerifyAccount from "./Pages/VerifyAccount";
import Profile from "./Pages/Profile";
import HackathonModifier from "./Pages/HackathonModifier";
import Event from "./Pages/Event";
import Organisation from "./Pages/Organisation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/verifyAccount/:jwt" Component={VerifyAccount}/>
        <Route path="/register" Component={Register}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/profile/:id" Component={Profile}/>
        <Route path="/hackathonmodifier" Component={HackathonModifier}/>
        <Route path="/event/:id" Component={Event}/>
        <Route path="/organisation/:name" Component={Organisation}/>
        <Route path="*" Component={Pagenotfount}/>
      </Routes>
    </Router>
  );
}

export default App;
