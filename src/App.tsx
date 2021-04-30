import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './util/firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styled from 'styled-components';

// Components
import Credentials from './components/Credentials';
import HomeContainer from './components/Home';
import ProfileMe from './components/ProfileMe';

function App() {

  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Link to={`/`}>
          <LogoHeader>
            <h1 style={{ cursor: 'pointer' }}>SQUAWKR</h1>
          </LogoHeader>
        </Link>
        <Switch>
          <Route exact path="/">
            {!user ? <Credentials /> : <HomeContainer />}
          </Route>

          <Route exact path="/profile">
            <ProfileMe />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

const LogoHeader = styled.div`
  background-color: whitesmoke;
  position: absolute;
  width: 30rem;
`;

export default App;
