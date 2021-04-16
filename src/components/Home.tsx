import { useEffect } from 'react';
import { auth } from '../util/firebase';

function Home() {

    useEffect(() => {
        auth.signOut();
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Home
