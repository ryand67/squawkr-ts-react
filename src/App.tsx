import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './util/firebase';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

// Components
import Credentials from './components/Credentials';

function App() {

  const [user, loading] = useAuthState(auth);

  return (
    <div className="App">
      {!user ? <Credentials /> : ''}
    </div>
  );
}

export default App;
