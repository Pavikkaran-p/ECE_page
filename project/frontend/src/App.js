import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Pagenotfount from "./Pages/Pagenotfount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="*" Component={Pagenotfount}/>
      </Routes>
    </Router>
  );
}

export default App;
