import 'fontsource-roboto';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import DateChecker from "./components/date-checker.components";
import Navbar from "./components/navbar.component";
import AddDateRange from "./components/add-date-range.component";
import Admin from "./components/admin.component";
 
function App() {
 return (
   <Router>
    <div className="container-fluid">
      <Navbar /> 
      <Route path="/check" exact component={DateChecker} />
      <Route path="/add-range" exact component={AddDateRange} />
      <Route path="/admin" exact component={Admin} />   
    </div>
   </Router>


    
   
   
 );
}
 
export default App;