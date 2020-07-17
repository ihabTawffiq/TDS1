import React from 'react';
import { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Client from './clients';
import Delivery from './delivery';
import Order from './orders';
import Nav from './newNav';
import FilterBy from './filterby';
import FilterByClient from './filterbyclient';
import Search from './search';
import ChooseDelivert from './addorderfordelivery';
import DeliveryOrders from './deliveryOrders';
import clientProfile from './selectClient';
import Calc from './calc';
import Discarded from './discarded'
import calcCards from './calc-cards'
import moreOrders from './more-orders'
import '../style/base.css';





class App extends Component {
  render() {
    return (
      // <div>
      //   <Order/>
      //   <Calc/>

      // </div>

      <BrowserRouter>
        <div>

          <Nav />
          <Route exact path='/' component={Client} />
          <Route exact path='/Delivery' component={Delivery} />
          <Route exact path='/Order' component={Order} />
          <Route exact path='/FilterBy' component={FilterBy} />
          <Route exact path='/FilterByClient' component={FilterByClient} />
          <Route exact path='/Search' component={Search} />
          <Route exact path='/ChooseDelivert' component={ChooseDelivert} />
          <Route exact path='/DeliveryOrders' component={DeliveryOrders} />
          <Route exact path='/clientProfile' component={clientProfile} />
          <Route exact path='/Calc' component={Calc} />
          <Route exact path='/Discarded' component={Discarded} />
          <Route exact path='/CalcCards' component={calcCards} />
          <Route exact path='/moreOrders' component={moreOrders} />



        </div>
      </BrowserRouter>
    );
  }
}

export default App;


















// Test1
// class App extends React.Component{

//   render(){
//       return(
//         <div>
//            {/* <Client/>

//           <Delivery/> */}
//     <div className="App__form"></div>
//     <div className="App__Aside"></div>
//         </div>
//       )
//   }
// }

// export default App;








//Test 2 
// <Router basename="/react-auth-ui/">
      //   <div className="App">
      //     <div className="App__Aside"></div>
      //     <div className="App__Form">
      //       <div className="PageSwitcher">
      //           <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
      //           <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
      //         </div>

      //         <div className="FormTitle">
      //             <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
      //         </div>


      //         <Route path="/sign-in" component={Client}>
      //         </Route>
      //     </div>

      //   </div>
      // </Router>