import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../util/firebase';

function Login() {

    const [email, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorFlag, setErrorFlag] = useState<Boolean>(false);
    const [errorMsg, setErrorMsg] = useState<String>('');

    const handleSubmit = (e): void => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {

        }).catch(err => {
            setErrorFlag(true);
            setErrorMsg(`${err.message} (Click to close)`);
            throw err;
        })
    }

    const handleErrorClose = (): void => {
        setErrorFlag(false);
        setErrorMsg('');
    }

    return (
        <LoginContainer>
            <LoginForm onSubmit={e => handleSubmit(e)}>
                <ErrorMessage onClick={() => handleErrorClose()}>{errorFlag ? errorMsg : ''}</ErrorMessage>
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

const ErrorMessage = styled.h1`
    color: red;
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
