import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import Game from './components/Game';
import LoginForm from './components/LoginForm';

import './App.css';

export default function App () {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ topScore, setTopScore ] = useState(0);

  async function incrementScore () {
    const response = await fetch(`http://localhost:4000/users/${username}`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTopScore(data.data.topScore);
    }
  }

  function renderHome () {
    if (isLoggedIn) {
      return (
        <Game
          incrementScore={incrementScore}
        />
      );
    } else {
      return (
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          If you would like to play, you must <Link to="/login">login</Link>.
          If you don't yet have an account, you can <Link to="/register">register</Link>.
        </h2>
      );
    }
  }

  function logout () {
    setIsLoggedIn(false);
    setUsername('');
  }

  return (
    <Router>
      <div>
        <header>
          <h1 className="site-title" >
            Rock Paper Scissors
          </h1>
          <nav>
            {isLoggedIn && <span className="nav-link">{username} ({topScore})</span>}
            <span className="nav-link"><NavLink exact to="/">Play</NavLink></span>
            {!isLoggedIn && <span className="nav-link"><NavLink exact to="/login">Login</NavLink></span>}
            {!isLoggedIn && <span className="nav-link"><NavLink exact to="/register">Register</NavLink></span>}
            {isLoggedIn && <span className="nav-link"><a href="#" onClick={logout}>Logout</a></span>}
          </nav>
        </header>

        <Switch>
          <Route path="/register">
            <LoginForm
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              setTopScore={setTopScore}
              register
            />
          </Route>
          <Route path="/login">
            <LoginForm
              setIsLoggedIn={setIsLoggedIn}
              setTopScore={setTopScore}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/">
            {renderHome}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
