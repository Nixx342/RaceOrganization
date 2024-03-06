import './App.css'
import About from './components/About';
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import Participants from './components/Participants';
import ParticipantPage from './components/ParticipantPage';

function App() {

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
          <Route path='/about' Component={About} />
          <Route path='/participants' Component={Participants} />
          <Route path='/participants/:id' Component={ParticipantPage} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
