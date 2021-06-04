import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './util/firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styled from 'styled-components';

// Components
import Credentials from './components/Credentials';
import HomeContainer from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import SearchBar from './components/SearchBar';

function App() {

  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Link to={`/`}>
          <LogoHeader>
            <h1 style={{ cursor: 'pointer' }}>SQUAWKR</h1>
            <SearchBar />
          </LogoHeader>
        </Link>
        <Switch>
          <Route exact path="/">
            {!user ? <Credentials /> : <HomeContainer />}
          </Route>

          <Route exact path="/user/:username">
            <Profile />
          </Route>

          <Route exact path="/edit-profile">
            <EditProfile />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

const LogoHeader = styled.div`
  background-color: whitesmoke;
  position: absolute;
  width: 20rem;
`;

export default App;
