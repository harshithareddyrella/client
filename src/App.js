import Navbar from './Navbar';
import Home from './Home';
import Meeting from './Meeting';
import Signup from './signup';
import Signin from './signin';
import { SrcContextProvider } from './srcContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  // const title = 'Welcome to ms teams clone';
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
                <Route exact path="/Meeting">
                    <Meeting/>   
                </Route>
              </Switch>
          </div>
          
        </div>
      </Router>

    </SrcContextProvider>
    
  );
}

export default App;
