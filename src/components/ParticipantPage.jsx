import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { useState } from 'react';
import {Navigate} from 'react-router-dom'
import InputMask from 'react-input-mask';
import '../assets/ParticipantPage.css'

function ParticipantPage ({ participants, removeParticipant, editParticipant }) {

    const { id } = useParams();
    const [participant, setParticipant] = useState({...participants[id]});
    const [redirect, setRedirect] = useState(false)
    const [oldEmail] = useState(participant.email)
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
    const handleRedirect = () => {
      setRedirect(true)
    }
    const handleEdit = (e) => {
      setErrors({})
      e.preventDefault()
      const errors = validateForm(participant)
      if(Object.keys(errors).length === 0 ) {
        editParticipant(oldEmail, participant);
        setRedirect(true)
        setErrors({})
      }
      else {
        setErrors(errors)
      }
    }
    const handleDelete = () => {
      removeParticipant(participant.email);
      setRedirect(true)
    }
   
    if (redirect){
      return <Navigate  to='/participants' /> 
    }

    return (
        <div>
          {
            Object.keys(errors).map(key => (
              <div key={key} className="error-area">
                <span className="error">{errors[key]}</span>
              </div>
            ))
          }
          <form>
            <div className='form-element'>
              <label className='label-text'>Фамилия:</label>  
              <input 
                className='input-element'
                name="surname"
                value={participant.surname}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Имя:</label> 
              <input 
                className='input-element'
                name="name"
                value={participant.name}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Отчество:</label> 
              <input 
                className='input-element'
                name="middleName"
                value={participant.middleName}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Город:</label> 
              <input 
                className='input-element'
                name="city"
                value={participant.city}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Дата рождения:</label> 
              <input 
                className='input-element'
                name="birthday"
                type='date' 
                value={participant.birthday}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Электронная почта:</label>
              <input 
                className='input-element'
                name="email"
                value={participant.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Телефон:</label> 
              <InputMask 
                className='input-element'
                mask="+7(999)999-99-99"
                name='phone'
                value={participant.phone}
                onChange={handleChange}
              />
            </div>
            <div className='form-element'>
              <label className='label-text'>Дистанция:</label> 
              <select 
                className='input-element'
                name="distance" 
                onChange={handleChange} 
                value={participant.distance}
              >
                <option value={3}>3 км</option>
                <option value={5}>5 км</option>
                <option value={10}>10 км</option>
              </select>
            </div>
            <div className='form-element'>
              <label className='label-text'>Взнос за участие:</label>
              <input 
                className='checkbox-custom'
                name="hasPayment"
                type='checkbox' 
                checked={participant.hasPayment}
                onChange={handleChange}
              />
            </div>
            <div className='btn-group'>
              <button onClick={handleEdit}>Сохранить</button>
              <button onClick={handleDelete}>Удалить</button>
              <button onClick={handleRedirect}>Закрыть</button>
            </div>
            
          </form>

          {/* <form>
            <label className='form-element'>
              Фамилия:  
              <input 
                name="surname"
                value={participant.surname}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Имя: 
              <input 
                name="name"
                value={participant.name}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Отчество: 
              <input 
                name="middleName"
                value={participant.middleName}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Город: 
              <input 
                name="city"
                value={participant.city}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Дата рождения: 
              <input 
                name="birthday"
                type='date' 
                value={participant.birthday}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Электронная почта
              <input 
                name="email"
                value={participant.email}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Телефон: 
              <InputMask 
                mask="+7(999)999-99-99"
                name='phone'
                value={participant.phone}
                onChange={handleChange}
              />
            </label>
            <label className='form-element'>
              Дистанция: 
              <select name="distance" onChange={handleChange} value={participant.distance}>
                <option value={3}>3 км</option>
                <option value={5}>5 км</option>
                <option value={10}>10 км</option>
              </select>
            </label>
            <label className='form-element'>
              Взнос за участие 
              <input 
                  name="hasPayment"
                  type='checkbox' 
                  checked={participant.hasPayment}
                  onChange={handleChange}
              />
            </label>
          </form> */}
          
        </div>
    );
}

ParticipantPage.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      surname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      hasPayment: PropTypes.bool.isRequired
    })
  ).isRequired,
  removeParticipant: PropTypes.func.isRequired,
  editParticipant: PropTypes.func.isRequired
};

export default ParticipantPage;
