const initialState = {
    participants: [
        {
          "surname": "Иванов",
          "name": "Петр",
          "middleName": "Иванович",
          "city": "Пермь",
          "birthday": "1990-01-01",
          "email": "ivan@gmail.com",
          "phone": "+7(999)555-35-35",
          "distance": 5,
          "hasPayment": true
        },
        {
          "surname": "Константинопольский",
          "name": "Константин",
          "middleName": "Константинович",
          "city": "Александровск-Сахалинский",
          "birthday": "1985-02-15",
          "email": "konstantinopolskiy@gmail.com",
          "phone": "+7(912)345-67-89",
          "distance": 10,
          "hasPayment": true
        },
        {
          "surname": "Чернова",
          "name": "Анастасия",
          "middleName": "Витальевна",
          "city": "Санкт-Петербург",
          "birthday": "1999-10-22",
          "email": "nastya123@ya.ru",
          "phone": "+7(937)465-70-33",
          "distance": 3,
          "hasPayment": false
        }
      ],
}
const  participantsReducer  = ( state = initialState, action) => {
    switch(action.type){
        case 'ADD_PARTICIPANT':
            return {
                ...state,
                participants: [...state.participants, action.payload]
            }
        case 'REMOVE_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.filter(participant => participant.email !== action.payload),
            }
        case 'EDIT_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.map((participant) =>
                    participant.email === action.payload.email ? { ...participant, ...action.payload.participant } : participant
                ),
            }
        default:
            return state
    }
}

export default participantsReducer