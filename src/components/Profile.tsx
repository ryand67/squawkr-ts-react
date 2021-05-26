
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../util/firebase';
import { useParams, Link } from 'react-router-dom';

import styled from 'styled-components';

import { UserInfoType, Post } from '../util/Interfaces';

import PostCard from './Post';
import PostForm from './PostForm';

function Profile() {

    const [user] = useAuthState(auth);

    
    let { username } = useParams();
    const [profileEmail] = useState<string>(username.substr(10));
    const [userInfo, setUserInfo] = useState<UserInfoType>({email: '', username: '', bio: '', name: '', followers: 0, following: 0});
    const [followerCount, setFollowerCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [posts, setPosts] = useState<Post []>([]);
    const [following, setFollowing] = useState<Boolean>();
    
    let isProfileOwnwer: Boolean = user?.email === profileEmail;

    const handleFollow = (): void => {
        //Unfollow
        if(following) {
            //Unfollow user
            db.collection('users').where('email', '==', user?.email).get().then(res => {
                let followingHolder = res.docs[0].data().following;
                let indexHolder: number = followingHolder.indexOf(profileEmail);
                followingHolder.splice(indexHolder);
                db.collection('users').doc(res.docs[0].id).update({
                    following: followingHolder
                })
            }) 

            // Update unfollowing on profile
            db.collection('users').where('email', '==', profileEmail).get().then(res => {
                let followerHolder = res.docs[0].data().followers;
                let indexHolder: number = followerHolder.indexOf(user?.email);
                followerHolder.splice(indexHolder);
                db.collection('users').doc(res.docs[0].id).update({
                    followers: followerHolder
                })
            })
        } else {
            //Follow user
            db.collection('users').where('email', '==', user?.email).get().then(res => {
                let followingHolder = res.docs[0].data().following;
                followingHolder.push(profileEmail);
                db.collection('users').doc(res.docs[0].id).update({
                    following: followingHolder
                })
            })

            // Update following on profile
            db.collection('users').where('email', '==', profileEmail).get().then(res => {
                let followerHolder = res.docs[0].data().followers;
                followerHolder.push(user?.email);
                db.collection('users').doc(res.docs[0].id).update({
                    followers: followerHolder
                })
            })
        }
        setFollowing(!following);
    }

    //NEED TO FIND A WAY TO GRAB THE USER INFO WITH THE TYPESCRIPT NONSENSE WITH THE USER?.EMAIL THING
    const findIfFollowing = (): void => {
        db.collection('users').doc('').get().then(res => {
            let data = res.data();
            if(!data?.following.includes(user?.email)) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        })
    }

    const getUserInfo = (): void => {
        db.collection('users').where('email', '==', profileEmail).get().then((res) => {
            if(res.docs.length === 0) {
                let holder: UserInfoType = {
                    email: '',
                    username: 'User Does Not Exist',
                    bio: '',
                    name: '',
                    followers: 0,
                    following: 0
                }
                setUserInfo(holder);
            } else {
                console.log(res.docs[0].data());
                let holder: UserInfoType = {
                    email: res.docs[0].data().email,
                    username: res.docs[0].data().username,
                    bio: res.docs[0].data().bio,
                    name: res.docs[0].data().name,
                    followers: res.docs[0].data().followers.length,
                    following: res.docs[0].data().following.length
                }
                setFollowerCount(res.docs[0].data().followers.length);
                setFollowingCount(res.docs[0].data().following.length);
                setUserInfo(holder);
            }
        })
    }

    const getUserPosts = (): void => {
        let postsHolder: Post[] = [];
        db.collection('posts').orderBy('postedDate', 'desc').where('authorEmail', '==', profileEmail).get().then(res => {
            res.forEach(item => {
                const holder: Post = { content: item.data().content,
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

    useEffect((): void => {
        getUserInfo();
        findIfFollowing();
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
                <NameHeader>{userInfo.username === 'User Does Not Exist' ? '' : userInfo.name}</NameHeader>
                <BioHolder>{userInfo.bio}</BioHolder>
                <FollowerInfo>Following: {followingCount} Followers: {followerCount}</FollowerInfo>
                {isProfileOwnwer ? <Link to="/edit-profile"><EditProfileButton>Edit Profile</EditProfileButton></Link> : <FollowButton onClick={() => handleFollow()}>{following ? 'Unfollow' : 'Follow'}</FollowButton>}
            </InfoContainer>
            {profileEmail === user?.email ? <PostForm /> : ''}
            <PostContainer>
                {posts.map(post => {
                    return <PostCard authorName={post.authorName} email={post.authorEmail} content={post.content} author={post.authorUsername} date={post.postedDate} id={post.id} key={post.id} />
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
    padding: 0 .5em;
`;

const NameHeader = styled.h3`
    padding: 0 .5em;
`;

const BioHolder = styled.p`
    padding: 0 1em;
    font-size: 1em;
`;

const EditProfileButton = styled.button`
    width: 25%;
`;

const PostContainer = styled.div`
    width: 100%;
    height: auto;
`;

const FollowButton = styled.button`
    width: 25%;
`;

const FollowerInfo = styled.p``;

export default Profile
