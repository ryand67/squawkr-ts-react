import { auth } from '../util/firebase';

function Home() {

    const so = (): void => {
        auth.signOut();
    }

    return (
        <div>
            <button onClick={so}>signout</button>
        </div>
    )
}

export default Home
