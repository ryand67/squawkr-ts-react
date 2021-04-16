import { useState } from 'react';
import * as validator from 'email-validator';
import styled from 'styled-components';

import { auth, db } from '../util/firebase';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [bio, setBio] = useState('');
    const [bioChar, setBioChar] = useState(0);

    const handleBioChange = (e) => {
        setBio(e.target.value);
        setBioChar(e.target.value.length);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validator.validate(email) && password === passwordRepeat) {
            auth.createUserWithEmailAndPassword(email, password).then(user => {
                console.log(user);
            })
        } else {
            throw Error;
        }
    }

    return (
        <SignUpForm onSubmit={e => handleSubmit(e)}>
            <SignUpHeader>Sign Up</SignUpHeader>
            <UsernameLabel>Email:</UsernameLabel>
            <UsernameInput placeholder="email..." required onChange={e => setEmail(e.target.value)} />
            <PasswordLabel>Password (at least 6 characters)</PasswordLabel>
            <PasswordInput placeholder="password..." required type="password" onChange={e => setPassword(e.target.value)} />
            <PasswordLabelRepeat>Password Confirm (at least 6 characters)</PasswordLabelRepeat>
            <PasswordInputRepeat placeholder="password..." required type="password" onChange={e => setPasswordRepeat(e.target.value)} />
            <BioLabel>Bio:</BioLabel>
            <BioInput rows={8} maxLength={350} placeholder="About you..." onChange={e => handleBioChange(e)} />
            <BioCount>{bioChar}/350</BioCount>
            <SignUpButton type="submit" onSubmit={e => handleSubmit(e)}>Sign Up</SignUpButton>
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

const PasswordLabelRepeat = styled.label``;

const PasswordInputRepeat = styled.input``;

const SignUpButton = styled.button``;

const BioLabel = styled.label``;

const BioInput = styled.textarea`
    resize: none;
`;

const BioCount = styled.p`
    text-align: right;
`;

export default SignUp
