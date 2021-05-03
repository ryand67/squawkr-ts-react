import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../util/firebase';

import styled from 'styled-components';

function EditProfile() {

    const [user] = useAuthState(auth);
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    const getUserInfo = async (): Promise<void> => {
        console.log(user);
        db.collection('users').where('email', '==', user?.email).get().then(res => {
            const holder = res.docs[0].data();
            setName(holder.name);
            setBio(holder.bio);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <EditForm>
            <label htmlFor="name">Name:</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" name="name"/>
            <label htmlFor="bio">Bio:</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} name="bio" id="" cols={30} rows={10}></textarea>
            <ButtonDiv>
                <button>Submit</button>
                <button>Cancel</button>
            </ButtonDiv>
        </EditForm>
    )
}

const EditForm = styled.div`
    height: 40em;
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;

    input,
    textarea {
        margin: 1em 0;
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export default EditProfile
