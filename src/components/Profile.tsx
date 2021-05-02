
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../util/firebase';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { UserInfoType, Post } from '../util/Interfaces';

import PostCard from './Post';
import PostForm from './PostForm';

function Profile() {

    const [user] = useAuthState(auth);

    let { username } = useParams();
    const [profileEmail, setProfileEmail] = useState<String>(username.substr(10));
    const [userInfo, setUserInfo] = useState<UserInfoType>({email: '', username: '', bio: ''});
    const [posts, setPosts] = useState<Post []>([]);

    const getUserInfo = (): void => {
        let userExists: Boolean = false;
        db.collection('users').where('email', '==', profileEmail).get().then((res) => {
            if(res.docs.length === 0) {
                let holder: UserInfoType = {
                    email: '',
                    username: 'User Does Not Exist',
                    bio: ''
                }
                setUserInfo(holder);
                userExists = false;
            } else {
                let holder: UserInfoType = {
                    email: res.docs[0].data().email,
                    username: res.docs[0].data().username,
                    bio: res.docs[0].data().bio
                }
                setUserInfo(holder);
                userExists = true;
            }
        })
    }

    const getUserPosts = (): void => {
        let postsHolder: Post[] = [];
        db.collection('posts').where('authorEmail', '==', profileEmail).get().then(res => {
            res.forEach(item => {
                const holder: Post = { content: item.data().content,
                    authorEmail: item.data().authorEmail,
                    authorUsername: item.data().authorUsername,
                    postedDate: item.data().postedDate,
                    id: item.id
                };

                postsHolder.push(holder);
            })
        }).then(() => {
            setPosts(postsHolder);
        })
    }

    useEffect((): void => {
        getUserInfo();
        if(userInfo.username === "User Does Not Exist") {
            return;
        } else {
            getUserPosts();
        }
    }, [])

    return (
        <ProfileContainer>
            <InfoContainer>
                <UsernameHeader>{userInfo.username === "User Does Not Exist" ? '': '@'}{userInfo.username}</UsernameHeader>
                <BioHolder>{userInfo.bio}</BioHolder>
            </InfoContainer>
            {profileEmail === user?.email ? <PostForm /> : ''}
            <PostContainer>
                {posts.map(post => {
                    return <PostCard email={post.authorEmail} content={post.content} author={post.authorUsername} date={post.postedDate} id={post.id} key={post.id} />
                })}
            </PostContainer>
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    width: 50%;
    height: 100vh;
    background: red;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    height: auto;
    min-height:15em;
    background: lightblue;
`;

const UsernameHeader = styled.h1`
    padding: 0 1em;
`;

const BioHolder = styled.p`
    padding: 0 1em;
    font-size: 1em;
`;

const PostContainer = styled.div`
    width: 100%;
    height: auto;
`;

export default Profile
