import { useState } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../util/firebase';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    }

    return (
        <LoginContainer>
            <LoginForm onSubmit={e => handleSubmit(e)}>
                <LoginHeader>LOGIN</LoginHeader>
                <UsernameLabel>Email:</UsernameLabel>
                <UsernameInput required placeholder="email..." onChange={e => setUsername(e.target.value)} />
                <PasswordLabel>Password:</PasswordLabel>
                <PasswordInput required type="password" placeholder="password..." onChange={e => setPassword(e.target.value)} />
                <LoginButton type="submit" onClick={e => handleSubmit(e)}>LOGIN</LoginButton>
            </LoginForm>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const LoginForm = styled.form`
    width: 25%;
    height: 50%;
    display: flex;
    flex-direction: column;

    * {
        margin: .25em 0;
    }
`;

const LoginHeader = styled.h1`

`;

const UsernameLabel = styled.label`

`;

const UsernameInput = styled.input`

`;

const PasswordLabel = styled.label`

`;

const PasswordInput = styled.input`

`;

const LoginButton = styled.button`
    
`;

export default Login
