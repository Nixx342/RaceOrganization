export const addParticipant = (participant) => {
    return {
        type: 'ADD_PARTICIPANT',
        payload: participant,
    }
}

export const removeParticipant = (email) => {
    return {
        type: 'REMOVE_PARTICIPANT',
        payload: email,
    }
}

export const editParticipant = (email, participant) => {
    return {
        type: 'EDIT_PARTICIPANT',
        payload: {
            email,
            participant,
        }
    }
}