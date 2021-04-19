import { useState } from 'react';

import styled from 'styled-components';
import Login from './Login';
import Signup from './SignUp';

function Credentials() {

    const [logToggle, setLogToggle] = useState<boolean>(true);

    const handleToggleChange = () => {
        setLogToggle(!logToggle);
    }

    return (
        <CredPage>
            {logToggle ? <Login /> : <Signup />}
            <Toggle onClick={handleToggleChange}>{logToggle ? 'Sign up' : 'Sign in'}</Toggle>
        </CredPage>
    )
}

const CredPage = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Toggle = styled.p`

`;

export default Credentials
