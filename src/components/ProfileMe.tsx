// PROFILE FOR THE LOGGED IN USER
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../util/firebase';

import styled from 'styled-components';

function ProfileMe() {

    const [user] = useAuthState(auth);
    console.log(user);

    return (
        <div>
            
        </div>
    )
}

export default ProfileMe
