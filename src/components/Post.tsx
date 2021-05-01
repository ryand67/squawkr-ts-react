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
    email: string;
}

function Post({ content, id, date, author, email }: Props) {

    const [user] = useAuthState(auth);
    
    //Checks if person who is logged in is the person who wrote the post.
    let isPostOwner: Boolean = user?.email === email;
    
    let newDate = convertTimestamp(date).toString().substr(0, 24);

    const handleDelete = (id: string): void => {
        db.collection('posts').doc(id).delete().then(() => {
            window.location.reload();
        })
    }

    return (
        <PostCard>
            {isPostOwner ? <DeleteButton onClick={() => handleDelete(id)}>X</DeleteButton> : ''}
            <Link to={`:username=${email}`}><Author>@{author}</Author></Link>
            <Content>{content}</Content>
            <Date>{newDate}</Date>
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

export default Post
