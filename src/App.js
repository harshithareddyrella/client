// importing essential libraries
import Navbar from './Navbar';
import Home from './Home';
import Meeting from './Meeting';
import Signup from './signup';
import Signin from './signin';
import Team from './Team';
import { SrcContextProvider } from './srcContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Routing to all the pages
function App() {
  return (
    <SrcContextProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
          <Switch>
                <Route exact path="/">                  
                  <Home />
                </Route>
                <Route path="/signin">
                  <Signin />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>  
                <Route path="/Meeting">
                    <Meeting/>   
                </Route>
                <Route path="/Team">
                    <Team/>   
                </Route>
              </Switch>
          </div>  
        </div>
      </Router>
    </SrcContextProvider>  
  );
}

export default App;
