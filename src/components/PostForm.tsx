import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../util/firebase';

import styled from 'styled-components';


function PostForm() {

    const [user] = useAuthState(auth);

    const [post, setPost] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(0);
    
    const handleChange = (postContent: string) => {
        setPost(postContent);
        setCharCount(postContent.length);
    }

    const getHashtags = async (post: string): Promise<any> => {
        const hashtags = post.split(" ").forEach((word) => {
            if (word.charAt(0) === "#") {
              return word;
            }
        });
        
        return new Promise(resolve => {
            resolve(hashtags);
        });
    };

    const handleSubmit = (e): void => {
        e.preventDefault();

        const postedDate = new Date();

        getHashtags(post).then((res) => {
            db.collection('posts').add({
                author: user ? user.email : undefined,
                content: post,
                hashtags: res,
                postedDate
            }).then(() => {
                setPost('');
                setCharCount(0);
            })
        });

    }

    return (
        <PostFormDiv>
            <Form onSubmit={handleSubmit}>
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
