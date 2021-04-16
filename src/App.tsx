import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './util/firebase';

// Components
import Login from './components/Login';

function App() {

  const [user, loading] = useAuthState(auth);

  return (
    <div className="App">
      {!user ? <Login /> : ''}
    </div>
  );
}

export default App;
