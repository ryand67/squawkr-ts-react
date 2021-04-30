
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../util/firebase';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { UserInfoType, Post } from '../util/Interfaces';

import PostCard from './Post';

function ProfileMe() {

    let { username } = useParams();
    const [profileEmail, setProfileEmail] = useState<String>(username.substr(10));
    const [userInfo, setUserInfo] = useState<UserInfoType>({email: '', username: '', bio: ''});
    const [posts, setPosts] = useState<Post []>([]);

    const getUserInfo = (): void => {
        db.collection('users').where('email', '==', profileEmail).get().then((res) => {
            let holder: UserInfoType = {
                email: res.docs[0].data().email,
                username: res.docs[0].data().username,
                bio: res.docs[0].data().bio
            }
            setUserInfo(holder);
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
        getUserPosts();
    }, [])

    return (
        <ProfileContainer>
            <InfoContainer>
                <UsernameHeader>@{userInfo.username}</UsernameHeader>
                <BioHolder>{userInfo.bio}</BioHolder>
            </InfoContainer>
            <PostContainer>
                {posts.map(post => {
                    console.log(post);
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

export default ProfileMe
