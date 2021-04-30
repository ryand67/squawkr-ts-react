import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './util/firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styled from 'styled-components';

// Components
import Credentials from './components/Credentials';
import HomeContainer from './components/Home';

function App() {

  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <LogoHeader onClick={() => window.location.replace('/')}>
          <h1 style={{ cursor: 'pointer' }}>SQUAWKR</h1>
        </LogoHeader>
        <Switch>
          <Route exact path="/">
            {!user ? <Credentials /> : <HomeContainer />}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

const LogoHeader = styled.div`
  background-color: whitesmoke;
`;

export default App;
