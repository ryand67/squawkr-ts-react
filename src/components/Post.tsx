import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { Link } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../util/firebase';

export type fbDate = {
    seconds: number;
    nanoseconds: number;
}

interface Props {
    content: string;
    id: string;
    date: fbDate | Date;
    author: string;
    authorName: string | undefined;
    email: string;
}

function Post({ content, id, date, author, email, authorName }: Props) {

    // Ref to the post
    const postRef = db.collection('posts').doc(id);
    // likeAmount: how many times the post has been liked
    const [likeAmount, setLikeAmount] = useState<number>(0);
    // whether the current user has liked the post
    const [liked, setLiked] = useState<boolean>(false);

    const [user] = useAuthState(auth);
    
    //Checks if person who is logged in is the person who wrote the post.
    let isPostOwner: Boolean = user?.email === email;
    
    let newDate = convertTimestamp(date).toString().substr(0, 24);

    // Deletes the post
    const handleDelete = (id: string): void => {
        postRef.delete().then(() => {
            window.location.reload();
        })
    }

    // Gets the like info
    const getLikes = () => {
        postRef.get().then(res => {
            // If the current user has liked the post, setLiked status accordingly
            if(res.data()?.likes.includes(user?.email)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
            // Sets the amount of likes based on liked array length
            setLikeAmount(res.data()?.likes.length);
        })
    }

    // Fires when the user clicks the like button
    const handleLikeUpdate = () => {
        postRef.get().then(res => {
            const currentLikes = res.data()?.likes;
            // If the current user has liked the post update the liked list to include the current user
            if(!currentLikes.includes(user?.email)) {
                currentLikes.push(user?.email);
                postRef.update({
                    likes: currentLikes
                })
            // Else remove the user from the liked list
            } else {
                let currentUserLike = currentLikes.indexOf(user?.email);
                currentLikes.splice(currentUserLike);
                postRef.update({
                    likes: currentLikes
                })
            }
        })
    }

    // On mount get the likes
    useEffect(() => {
        getLikes();
    }, [])

    return (
        <PostCard>
            {isPostOwner ? <DeleteButton onClick={() => handleDelete(id)}>X</DeleteButton> : ''}
            <Link to={`/user/:username=${email}`}><Author>{authorName}</Author></Link>
            <Link to={`/user/:username=${email}`}><Author>@{author}</Author></Link>
            <Content>{content}</Content>
            <Date>{newDate}</Date>
            <Likes onClick={() => handleLikeUpdate()}>{!liked ? '♥' : 'x'} {likeAmount}</Likes>
        </PostCard>
    )
}

const PostCard = styled.div`
    position: relative;
    width: 100%;
    background: blue;
    height: auto;
    min-height: 3rem;
    text-align: left;
    color: white;
    
    * {
        padding: 0 1em;
    }
`;

const Author = styled.h1`
    margin: 0;
    padding: 0;
`;

const Content = styled.p``;

const Date = styled.p``;

const DeleteButton = styled.p`
    position: absolute;
    top: 0;
    right: 0;
`;

const Likes = styled.p``;

export default Post
