import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import ParticipantPage from "./ParticipantPage"; 

function Participants({ participants }) {

  return (
    <div>
      <h1>Участники</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <Link to={`/participants/${index}`}>
              {participant.surname} {participant.name} {participant.middleName}
            </Link>
          </li>
        ))}
      </ul>
     
      <Routes>
        <Route path='/participants/:id' element={<ParticipantPage />} />
      </Routes>
    </div>
  );
}

export default Participants;



// import React from "react";
// import { Link, Routes, Route } from "react-router-dom";
// import ParticipantPage from "./ParticipantPage";

// function Participants({ participants }) {
//   return (
//     <div>
//       <h1>Участники</h1>
//       <ul>
//         {participants.map((participant, index) => (
//           <li key={index}>
//             <Link to={`/participants/${index}`}>
//               {participant.surname} {participant.name} {participant.middleName}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Routes>
//         <Route path="/participants/:id" element={<ParticipantPage participants={participants} />} />
//       </Routes>
//     </div>
//   );
// }

// export default Participants;