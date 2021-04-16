import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './util/firebase';

// Components
import Credentials from './components/Credentials';
import Home from './components/Home';

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {!user ? <Credentials /> : <Home />}
    </div>
  );
}

export default App;
