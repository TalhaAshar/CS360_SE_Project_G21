import './App.css';
import Header from './Components/Header'
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom'
import styled from 'styled-components'
import Home from './Components/Home'
import Footer from './Components/Footer'
import LogIn from './Components/LogIn'

function App() {
  return (
    <Router>
      
      <Container>
      <Header/>

        <Switch>

          <Route path="/">
            <Home/>
          </Route>

          <Route path="/publications">
            Publication
          </Route>

          <Route exact path="/LogIn">
            {console.log("IN HERE")}
            <LogIn/>
          </Route>

        </Switch>

      <Footer/>
      
      </Container>
    </Router>
  );
}

export default App;
//the whole page container
const Container = styled.div`
width:100%;
height:1580px;
display: grid;
grid-template-rows: 115px auto 110px;
`
