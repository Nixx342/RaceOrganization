import { useParams } from 'react-router-dom';

function ParticipantPage ({ participants }) {
    const { id } = useParams();
    const participant = participants[id];
    console.log(participants);

    return (
        <div>
            {participant && (
              <div>
                {participant.name}<br/>
                {participant.city}<br/>
              </div>
            )}
        </div>
    );
}

export default ParticipantPage;