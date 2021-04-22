import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../util/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import PostForm from './PostForm';
import PostCard from './Post';

function Home() {

    type fbDate = {
        seconds: number;
        nanoseconds: number;
    }

    interface Post {
        content: string;
        authorEmail: string;
        authorUsername: string;
        postedDate: fbDate;
    }

    const [user] = useAuthState(auth);

    const [posts, setPosts] = useState<Post []>([])

    useEffect(() => {
        grabPosts();
    }, [])

    const grabPosts = () => {
        let postsHolder: any[] = [];
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

    // db.collection('posts').onSnapshot(() => {
    //     grabPosts();
    // }, (error) => {
    //     throw error;
    // })

    console.log(posts);


    return (
        <HomeContainer>
            <button onClick={signOut}>signout</button>
            <PostForm />
            <PostContainer>
                {posts.map(post => {
                    return <PostCard content={post?.content} author={post?.authorUsername} date={post.postedDate} />
                })}
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
