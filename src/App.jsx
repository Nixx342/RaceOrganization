import "./App.css";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import Participants from "./components/Participants";
import ParticipantPage from "./components/ParticipantPage";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const participants = useSelector((state) => state.participants);
  const dispatch = useDispatch();

  const addParticipant = (participant) => {
    dispatch({ type: "ADD_PARTICIPANT", payload: participant });
  };

  const removeParticipant = (email) => {
    dispatch({ type: "REMOVE_PARTICIPANT", payload: email });
  };

  const editParticipant = (email, participant) => {
    dispatch({ type: "EDIT_PARTICIPANT", payload: { email, participant } });
  };

  return (
    <Router>
      <header>
        <nav>
          <Link to="/about">Информация о забеге</Link>
          <Link to="/participants">Участники</Link>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/participants/*"
            element={
              <Participants
                participants={participants}
                addParticipant={addParticipant}
              />
            }
          />
          <Route
            path="/participants/:id"
            element={
              <ParticipantPage
                participants={participants}
                removeParticipant={removeParticipant}
                editParticipant={editParticipant}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
