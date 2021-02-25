import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Users from './components/Users';
import Twoots from './components/Twoots';
import { UserProvider } from './contexts/UserContext';
import { TwootProvider } from './contexts/TwootContext';
// import { Navbar } from 'react-bootstrap';




function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar">
            <div className="nav-item">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-item">
              <Link to="/users">Users</Link>
            </div>
            <div className="nav-item">
              <Link to="/twoots">Twoots</Link>
            </div>
          </nav>
        </div>
        
        <Switch>
          <Route path="/users">
            <UserProvider>
              <Users />
            </UserProvider>
          </Route>          
          <Route path="/twoots">
            <TwootProvider>
              <Twoots />
            </TwootProvider>
          </Route>
        </Switch>


      </Router>
    </div>
  );
}

export default App;
