import styled from 'styled-components';

interface Props {
    content: string;
    id: string;
    date: string;
    author: string;
}

function Post({ content, id, date, author }: Props) {
    return (
        <PostCard>
            <Author>{author}</Author>
            <Content>{content}</Content>
            <Date>{date}</Date>
        </PostCard>
    )
}

const PostCard = styled.div`
    width: 100%;
    background: blue;
    height: auto;
    min-height: 3rem;
    text-align: left;
    
    * {
        padding: 0 1em;
    }
`;

const Author = styled.h1``;

const Content = styled.p``;

const Date = styled.p``;

export default Post
