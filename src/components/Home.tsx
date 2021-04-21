import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../util/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import PostForm from './PostForm';
import Post from './Post';

function Home() {

    const [user] = useAuthState(auth);

    const [posts, setPosts] = useState<Object []>([])

    useEffect(() => {
        grabPosts();
    }, [])

    //Make async so that it passes the posts back and then i can do a .then in the useEffect/etc

    const grabPosts = () => {
        let postsHolder: Object[] = [];
        db.collection('posts').get().then(res => {
            res.forEach(item => {
                postsHolder.push(item.data());
            })
        }).then(() => {
            setPosts(postsHolder);
        })
    }

    const signOut = (): void => {
        auth.signOut();
    }

    return (
        <HomeContainer>
            <button onClick={signOut}>signout</button>
            <PostForm />
            <PostContainer>
                <Post content="asdf" author="qwer" id="1414" date="asdf" />
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
    width: 75%;
    height: auto;
    min-height: 50vh;
    background-color: red;
`;

export default Home
