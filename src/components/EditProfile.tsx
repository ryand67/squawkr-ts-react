import styled from 'styled-components';

function EditProfile() {
    return (
        <EditForm>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name"/>
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" id="" cols={30} rows={10}></textarea>
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
