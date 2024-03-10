import  { useState } from "react";
import { Link} from "react-router-dom";
// import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import InputMask from 'react-input-mask';
import '../assets/Participants.css'


function Participants({ participants, addParticipant }) {
// function Participants({ participants, addParticipant, removeParticipant, editParticipant  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participant, setParticipant] = useState({
    surname: "",
    name: "", 
    middleName: "",
    city: "",
    birthday: "",
    email: "",
    phone: "",
    distance: 0,
    hasPayment: false
  });
  const [errors, setErrors] = useState({})

  const validateForm = (formData) => {
    const errors = {};
    const keyName  = {
      surname: "Фамилия",
      name: "Имя", 
      middleName: "Отчество",
      city: "Город проживания",
      birthday: "Дата рождения",
      email: "Электронная почта",
      phone: "Телефон",
      distance: "Дистанция",
    }
    // Проверка на заполненность всех полей
    for (const key in formData) {
      if (!formData[key] && key!= 'hasPayment') {
        errors[key] = `Поле "${keyName[key]}" обязательно для заполнения`;
      }
    }
  
    // Проверка корректности введенной даты рождения
    const today = new Date();
    const birthDate = new Date(formData.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 14) {
      errors['birthday'] = 'Участник должен быть старше 14 лет';
    }
  
    // Проверка корректности email
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors['email'] = 'Введите корректный email адрес';
    }
  
    // Проверка корректности номера телефона
    const phoneRegex = /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors['phone'] = 'Введите корректный номер телефона в формате: +7(999)999-99-99';
    }

    const nameRegex = /\d/;
    if (formData.surname && nameRegex.test(formData.surname)) {
      errors['surname'] = 'Фамилия не должна содержать цифры';
    }
    if (formData.name && nameRegex.test(formData.name)) {
      errors['name'] = 'Имя не должно содержать цифры';
    }
    if (formData.middleName && nameRegex.test(formData.middleName)) {
      errors['middleName'] = 'Отчество не должно содержать цифры';
    }
    if (formData.city && nameRegex.test(formData.city)) {
      errors['city'] = 'Город проживания не должен содержать цифры';
    }
  
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setParticipant(prevParticipant => ({
        ...prevParticipant,
        [name]: newValue
    }));
  };

  const save = (e) => {
    setErrors({})
    e.preventDefault()
    const errors = validateForm(participant)
    if(Object.keys(errors).length === 0 ) {
      addParticipant(participant);
      setIsModalOpen(false)
      console.log(participant.phone)
      setErrors({})
    }
    else {
      setErrors(errors)
    }
  }
  const exit = () => {
    setErrors({})
    setIsModalOpen(false)
  }

  return (
    <div className="participants">
      <div className="page-header">
        <h1 className="page-name">Участники</h1>
        <button onClick={() => setIsModalOpen(true)} className="add-btn">Добавить</button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div  className="modal-form">
          <div>
              {
                Object.keys(errors).map(key => (
                  <div key={key} className="error-area">
                    <span className="error">{errors[key]}</span>
                  </div>
                ))
              }
            </div>
            <form>
            <input 
              name="surname"
              onChange={handleChange}
              placeholder="Введите фамилию"
            />
            <input 
              name="name"
              onChange={handleChange}
              placeholder="Введите имя"
            />
            <input 
              name="middleName"
              onChange={handleChange}
              placeholder="Введите отчество"
            />
            <input 
              name="city"
              onChange={handleChange}
              placeholder="Город проживания"
            />
            <input 
              name="birthday"
              type='date' 
              onChange={handleChange}
            />
            <input 
              name="email"
              onChange={handleChange}
              placeholder="Электронная почта"
            />
            <InputMask 
              mask="+7(999)999-99-99"
              name='phone'
              onChange={handleChange}
              placeholder="Телефон для связи"
            />
            
              <select name="distance" onChange={handleChange} >
                <option value="" disabled selected>Выберите дистанцию</option>
                <option value={3}>3 км</option>
                <option value={5}>5 км</option>
                <option value={10}>10 км</option>
              </select>

            <label>Взнос за участие 
              <input 
                name="hasPayment"
                type='checkbox' 
                onChange={handleChange}
              />
            </label>  
            <button onClick={exit}>Закрыть</button>          
            <button type='submit' onClick={save}>Сохранить</button>
          </form>
          </div>
        </div>
      )}
      {participants.map((participant, index) => (
          <Link 
            key={index} 
            to={`/participants/${index}`}
            className="participant-row"
          >
            <div className="participant-person-info">
              <div className="participant-full-name">
                <span className="participant-surname">{participant.surname} </span>
                <span className="participant-name">{participant.name} </span>
                <span className="participant-middle-name">{participant.middleName} </span>
              </div>
              {participant.hasPayment ?
                <span className="hasPayment other-info">Взнос уплачен</span>:
                <span className="hasPayment other-info">Взнос не уплачен</span>
              }
              <span className="city other-info">{participant.city}</span>
              <span className="distance">{participant.distance} км</span>
            </div>
          </Link>
      ))}
    </div>
  );
}

export default Participants;