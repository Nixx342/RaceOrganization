import './App.css'
import About from './components/About';
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import Participants from './components/Participants';
import ParticipantPage from './components/ParticipantPage';

function App() {
  let data = {
    "participants": [
      {
        "surname": "Иванов",
        "name": "Петр",
        "middleName": "Иванович",
        "city": "Пермь",
        "birthday": "1990-01-01",
        "email": "ivan@gmail.com",
        "phone": "+79995553535",
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
        "phone": "+79123456789",
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
        "phone": "+79374657033",
        "distance": 3,
        "hasPayment": false
      }
    ]
  }
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
          <Route path='/participants/*' element={<Participants participants={data.participants} />} />
          <Route path='/participants/:id' element={<ParticipantPage participants={data.participants} />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
