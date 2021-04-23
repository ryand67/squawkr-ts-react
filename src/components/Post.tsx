import styled from 'styled-components';
import { convertTimestamp } from 'convert-firebase-timestamp';

export type fbDate = {
    seconds: number;
    nanoseconds: number;
}

interface Props {
    content: string;
    id: string;
    date: fbDate | Date;
    author: string;
}

function Post({ content, id, date, author }: Props) {
    
    let newDate = convertTimestamp(date).toString().substr(0, 24);

    return (
        <PostCard>
            <Author>@{author}</Author>
            <Content>{content}</Content>
            <Date>{newDate}</Date>
        </PostCard>
    )
}

const PostCard = styled.div`
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

export default Post
