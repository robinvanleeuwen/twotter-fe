import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Users from './components/Users';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/users">
            <Users />
          </Route>          
        </Switch>


      </Router>
    </div>
  );
}

export default App;
