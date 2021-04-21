import { useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../util/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import PostForm from './PostForm';

function Home() {

    const [user] = useAuthState(auth);

    const signOut = (): void => {
        auth.signOut();
    }

    return (
        <HomeContainer>
            <button onClick={signOut}>signout</button>
            <PostForm />
            <PostContainer>

            </PostContainer>
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

const PostContainer = styled.div`
    width: 50%;
    height: auto;
    min-height: 50vh;
    background-color: red;
`;

export default Home
