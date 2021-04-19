import { useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../util/firebase';

import PostForm from './PostForm';

function Home() {

    useEffect(() => {
        
    }, [])

    const signOut = (): void => {
        auth.signOut();
    }

    return (
        <HomeContainer>
            <button onClick={signOut}>signout</button>
            <PostForm />
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0 auto;
`;

export default Home
