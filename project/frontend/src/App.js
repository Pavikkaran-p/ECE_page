import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Pagenotfount from "./Pages/Pagenotfount";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="*" Component={Pagenotfount}/>
      </Routes>
    </Router>
  );
}

export default App;
