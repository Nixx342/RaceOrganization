import { useParams } from 'react-router-dom';

function ParticipantPage () {
    const {id} = useParams()
    return(
        <div>
            Участник № {id}
        </div>
    )
} 

export default ParticipantPage