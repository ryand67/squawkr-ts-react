import { useState } from "react";
import * as validator from "email-validator";
import styled from "styled-components";

import { auth, db } from "../util/firebase";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [bioChar, setBioChar] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errMessage, setErrorMessage] = useState<string>("");

  const handleBioChange = (e): void => {
    setBio(e.target.value);
    setBioChar(e.target.value.length);
  };

  const clearError = (): void => {
    setError(false);
    setErrorMessage("");
  };

  // 

  const checkUsernameExists = async (): Promise<boolean> => {
    return new Promise(resolve => {
        db.collection('users').where('username', '==', username).get()
            .then(res => {
                if(res.docs.length > 0) {
                    resolve(true);
                    setError(!error);
                    setErrorMessage('Username already in use.');
                } else {
                    resolve(false);
                }
            })
    })
  }

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    let usernameCheck = await checkUsernameExists();
    if (validator.validate(email) && password === passwordRepeat && !usernameCheck) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          db.collection("users").add({
            email: email,
            username: username,
            bio: bio,
            name: name
          });
        })
        .catch((err) => {
          setError(!error);
          setErrorMessage(err.message);
        });
    } else {
      throw Error;
    }
  };

  return (
    <SignUpForm onSubmit={(e) => handleSubmit(e)}>
      <SignUpHeader>Sign Up</SignUpHeader>
      {error ? (
        <ErrorMessage onClick={clearError}>{errMessage}</ErrorMessage>
      ) : (
        ""
      )}
      <EmailLabel>Email:</EmailLabel>
      <EmailInput
        placeholder="email..."
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <UsernameLabel>Username</UsernameLabel>
      <UsernameInput
        placeholder="@username..."
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <NameLabel>Name:</NameLabel>
      <NameInput
        placeholder="name..."
        required
        onChange={((e) => setName(e.target.value))}
      />
      <PasswordLabel>Password (at least 6 characters)</PasswordLabel>
      <PasswordInput
        placeholder="password..."
        required
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordLabelRepeat>
        Password Confirm (at least 6 characters)
      </PasswordLabelRepeat>
      <PasswordInputRepeat
        placeholder="password..."
        required
        type="password"
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      <BioLabel>Bio:</BioLabel>
      <BioInput
        rows={8}
        maxLength={350}
        placeholder="About you..."
        onChange={(e) => handleBioChange(e)}
      />
      <BioCount>{bioChar}/350</BioCount>
      <SignUpButton type="submit" onSubmit={(e) => handleSubmit(e)}>
        Sign Up
      </SignUpButton>
    </SignUpForm>
  );
}

const SignUpForm = styled.form`
  width: 25%;
  display: flex;
  flex-direction: column;

  * {
    margin: 0.25em 0;
  }
`;

const SignUpHeader = styled.h1``;

const ErrorMessage = styled.h3`
  color: red;
`;

const EmailLabel = styled.label``;

const EmailInput = styled.input``;

const UsernameLabel = styled.label``;

const UsernameInput = styled.input``;

const NameLabel = styled.label``;

const NameInput = styled.input``;

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

export default SignUp;
