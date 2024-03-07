function Participants ({participants}) {

    return (
        <div>
            <h2>Участники</h2>
            <ul>
                {participants.map((participant, index) => (
                <li key={index}>
                    {participant.surname} {participant.name} {participant.middleName}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Participants