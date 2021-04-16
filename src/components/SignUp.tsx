import { useState } from 'react';
import * as Validator from 'email-validator';
import styled from 'styled-components';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [bioChar, setBioChar] = useState(0);

    const handleBioChange = (e) => {
        setBio(e.target.value);
        setBioChar(e.target.value.length);
    }

    return (
        <SignUpForm>
            <SignUpHeader>Sign Up</SignUpHeader>
            <UsernameLabel>Email:</UsernameLabel>
            <UsernameInput placeholder="email..." />
            <PasswordLabel>Password</PasswordLabel>
            <PasswordInput placeholder="password..." required type="password" />
            <BioLabel>Bio:</BioLabel>
            <BioInput rows={8} maxLength={350} onChange={e => handleBioChange(e)} />
            <BioCount>{bioChar}/350</BioCount>
            <SignUpButton>Sign Up</SignUpButton>
        </SignUpForm>
    )
}

const SignUpForm = styled.form`
    width: 25%;
    display: flex;
    flex-direction: column;

    * {
        margin: .25em 0;
    }
`;

const SignUpHeader = styled.h1``;

const UsernameLabel = styled.label``;

const UsernameInput = styled.input``;

const PasswordLabel = styled.label``;

const PasswordInput = styled.input``;

const SignUpButton = styled.button``;

const BioLabel = styled.label``;

const BioInput = styled.textarea`
    resize: none;
`;

const BioCount = styled.p`
    text-align: right;
`;

export default SignUp
