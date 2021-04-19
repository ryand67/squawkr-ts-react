import styled from 'styled-components';
import { auth } from '../util/firebase';

import PostForm from './PostForm';

function Home() {

    const so = (): void => {
        auth.signOut();
    }

    return (
        <HomeContainer>
            <PostForm />
            <button onClick={so}>signout</button>
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
