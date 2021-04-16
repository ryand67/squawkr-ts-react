import { useState } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../util/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Login() {
    return (
        <LoginContainer>
            <LoginForm>
                <LoginHeader>LOGIN</LoginHeader>
                <UsernameLabel>Username</UsernameLabel>
                <UsernameInput placeholder="username..." />
                <PasswordLabel>Password</PasswordLabel>
                <PasswordInput placeholder="password..." />
                <LoginButton>LOGIN</LoginButton>
            </LoginForm>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
