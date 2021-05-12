import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../util/firebase';

import styled from 'styled-components';


function PostForm() {

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');

    useEffect(() => {
        db.collection('users').where('email', '==', user?.email).get().then((res) => {
            res.forEach(item => {
                setName(item.data().name);
                setUsername(item.data().username);
            })
        });
    }, [])

    const [post, setPost] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(0);
    
    const handleChange = (postContent: string) => {
        setPost(postContent);
        setCharCount(postContent.length);
    }

    const handleSubmit = (e): void => {
        e.preventDefault();

        if(!post) return;

        const postedDate = new Date();

        db.collection('posts').add({
            authorUsername: username,
            authorEmail: user?.email,
            content: post,
            authorName: name,
            postedDate,
            likes: []
        }).then(() => {
            setPost('');
            setCharCount(0);
        })

    }

    return (
        <PostFormDiv>
            <Form onSubmit={e => handleSubmit(e)}>
                <PostText value={post} maxLength={250} onChange={e => handleChange(e.target.value)} />
                <CharCount style={{ color: `${charCount === 250 ? 'red' : 'black'}`}}>{charCount}/250</CharCount>
                <SubmitButton type="submit" onClick={ e => handleSubmit(e)}>Submit</SubmitButton>
            </Form>
        </PostFormDiv>
    )
}

const PostFormDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: 50%;

    * {
        margin: 0;
    }
`;

const Form = styled.div`

`;

const PostText = styled.textarea`
    width: 100%;
    height: 10rem;
    margin: 0 auto;
    resize: none;
`;

const CharCount = styled.p``;

const SubmitButton = styled.button``;

export default PostForm
