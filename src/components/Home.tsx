import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../util/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

import PostForm from './PostForm';
import PostCard from './Post';

import { Post } from '../util/Interfaces';

function Home() {

    const [user] = useAuthState(auth);

    const [postLimit, setPostLimit] = useState<number>(0);
    const [posts, setPosts] = useState<Post []>([])

    useEffect(() => {
        grabPosts(30);
    }, [])

    const grabPosts = (limitIncrementAmt: number) => {
        setPostLimit(postLimit + limitIncrementAmt);
        let postsHolder: Post[] = [];
        db.collection('posts').limit(postLimit || limitIncrementAmt).orderBy('postedDate', 'desc').get().then(res => {
            res.forEach(item => {
                console.log(item.data());
                const holder: Post = { 
                    content: item.data().content,
                    authorEmail: item.data().authorEmail,
                    authorUsername: item.data().authorUsername,
                    postedDate: item.data().postedDate,
                    authorName: item.data().authorName,
                    id: item.id
                };

                postsHolder.push(holder);
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
            <Link to={`/user/:username=${user?.email}`}><ProfileButton>Profile: {user?.email}</ProfileButton></Link>
            <PostForm />
            <PostContainer>
                {posts.map(post => {
                    console.log(post.authorName);
                    return <PostCard authorName={post.authorName} email={post.authorEmail} content={post.content} author={post.authorUsername} date={post.postedDate} id={post.id} key={post.id} />
                })}
            </PostContainer>
            <LoadMoreButton onClick={() => grabPosts(30)}>Load More</LoadMoreButton>
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

const ProfileButton = styled.button`
    position: absolute;
    right: 0;
    margin-top: 1em;
    margin-right: 1em;
`;

const PostContainer = styled.div`
    width: 75%;
    height: auto;
    min-height: 50vh;
    background-color: red;
`;

const LoadMoreButton = styled.button``;

export default Home
