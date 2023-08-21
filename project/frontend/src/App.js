import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Pagenotfount from "./Pages/Pagenotfount";
import Dashboard from "./Pages/Dashboard";
import VerifyAccount from "./Pages/VerifyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
<<<<<<< HEAD
        <Route path="/verifyAccount/:jwt" Component={VerifyAccount}/>
=======
        <Route path="/register" Component={Register}/>
>>>>>>> e47aa8dbcd6fa4e249bc00ad064400ea82d93e16
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="*" Component={Pagenotfount}/>
      </Routes>
    </Router>
  );
}

export default App;
