// import React, { Component, Fragment } from "react";
// import { render } from "react-dom";
// import { HashRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
// import Home from "./publications/Home";
// import AddPub from "./publications/Add";
// import DeletePub from "./publications/Delete";
// import Header from "./layouts/Header";


// class App extends Component{
//   render(){
//     return(
//         <Router>
//           <Fragment>
//             <Header/>
//             <div className="container">
//               <Switch>
//                 <Route exact path ="/" component = {Home} />
//                 <Route exact path ="/add" component = {AddPub} />
//                 <Route exact path ="/delete" component = {DeletePub} />
//               </Switch>
//             </div>
             
//           </Fragment>
//         </Router>
//     )
//   }
// }


// const container = document.getElementById("app");
// render(<App />, container);


import React, { Component } from "react";
import { render } from "react-dom";

import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AddPublication from "./publications/AddPublication";
import EditPublication from "./publications/EditPublication";
import TakedownRequest from "./forms/TakedownRequest";
import ContactUs from "./forms/ContactUs";

class App extends Component{
  render(){
    return(
      // <Router>
      //   <Fragment>
      //     <Header/>
      //   <div className="container">
      //     <Switch>
      //       <Route exact path ="/" component = {Home} />
      //       <Route exact path ="/add" component = {AddPub} />
      //     </Switch>
      //   </div>
      //   </Fragment>
      // </Router>
      <div>
      <AddPublication />
      </div>
    );
  }
}


const container = document.getElementById("app");
render(<App />, container);