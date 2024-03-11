import { useState } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";
import "../assets/Participants.css";

function Participants({ participants, addParticipant }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [participant, setParticipant] = useState({
    surname: "",
    name: "",
    middleName: "",
    city: "",
    birthday: "",
    email: "",
    phone: "",
    distance: 0,
    hasPayment: false,
  });

  const validateForm = (formData) => {
    const errors = {};
    const keyName = {
      surname: "Фамилия",
      name: "Имя",
      middleName: "Отчество",
      city: "Город проживания",
      birthday: "Дата рождения",
      email: "Электронная почта",
      phone: "Телефон",
      distance: "Дистанция",
    };
    // Проверка на заполненность всех полей
    for (const key in formData) {
      if (!formData[key] && key != "hasPayment") {
        errors[key] = `Поле "${keyName[key]}" обязательно для заполнения`;
      }
    }

    // Проверка корректности введенной даты рождения
    const today = new Date();
    const birthDate = new Date(formData.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 14) {
      errors["birthday"] = "Участник должен быть старше 14 лет";
    }

    // Проверка корректности email
    const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors["email"] = "Введите корректный email адрес";
    }

    // Проверка корректности номера телефона
    const phoneRegex = /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors["phone"] =
        "Введите корректный номер телефона в формате: +7(999)999-99-99";
    }

    const nameRegex = /\d/;
    // Проверка корректности фамилии
    if (formData.surname && nameRegex.test(formData.surname)) {
      errors["surname"] = "Фамилия не должна содержать цифры";
    }
    // Проверка корректности имени
    if (formData.name && nameRegex.test(formData.name)) {
      errors["name"] = "Имя не должно содержать цифры";
    }
    // Проверка корректности отчества
    if (formData.middleName && nameRegex.test(formData.middleName)) {
      errors["middleName"] = "Отчество не должно содержать цифры";
    }
    // Проверка корректности города
    if (formData.city && nameRegex.test(formData.city)) {
      errors["city"] = "Город проживания не должен содержать цифры";
    }

    return errors;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setParticipant((prevParticipant) => ({
      ...prevParticipant,
      [name]: newValue,
    }));
  };
  const format = () => {
    let formattedParticipant = { ...participant };
    formattedParticipant.surname =
      formattedParticipant.surname.charAt(0).toUpperCase() +
      formattedParticipant.surname.slice(1).toLowerCase();
    formattedParticipant.name =
      formattedParticipant.name.charAt(0).toUpperCase() +
      formattedParticipant.name.slice(1).toLowerCase();
    formattedParticipant.middleName =
      formattedParticipant.middleName.charAt(0).toUpperCase() +
      formattedParticipant.middleName.slice(1).toLowerCase();
    formattedParticipant.city =
      formattedParticipant.city.charAt(0).toUpperCase() +
      formattedParticipant.city.slice(1).toLowerCase();
    formattedParticipant.email = formattedParticipant.email.toLowerCase();
    return formattedParticipant;
  };

  const save = (e) => {
    e.preventDefault();
    const errors = validateForm(participant);
    if (Object.keys(errors).length === 0) {
      addParticipant(format());
      setIsModalOpen(false);
      setErrors({});
    } else {
      setErrors(errors);
    }
  };
  const exit = () => {
    setErrors({});
    setIsModalOpen(false);
  };

  return (
    <div className="participants">
      <div className="page-header">
        <h1 className="page-name">Участники</h1>
        <button onClick={() => setIsModalOpen(true)} className="add-btn">
          Добавить
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-form">
            <div>
              {Object.keys(errors).map((key) => (
                <div key={key} className="error-area">
                  <span className="error">{errors[key]}</span>
                </div>
              ))}
            </div>
            <form className="modal-form">
              <div className="btn-group">
                <button onClick={exit}>Закрыть</button>
                <button type="submit" onClick={save}>
                  Сохранить
                </button>
              </div>
              <div className="form-element">
                <label className="label-text">Фамилия:</label>
                <input
                  className="input"
                  name="surname"
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label className="label-text">Имя:</label>
                <input className="input" name="name" onChange={handleChange} />
              </div>
              <div className="form-element">
                <label className="label-text">Отчество:</label>
                <input
                  className="input"
                  name="middleName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label className="label-text">Город:</label>
                <input className="input" name="city" onChange={handleChange} />
              </div>
              <div className="form-element">
                <label className="label-text">Дата рождения:</label>
                <input
                  className="input"
                  name="birthday"
                  type="date"
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label className="label-text">Электронная почта:</label>
                <input className="input" name="email" onChange={handleChange} />
              </div>
              <div className="form-element">
                <label className="label-text">Телефон:</label>
                <InputMask
                  className="input"
                  mask="+7(999)999-99-99"
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label className="label-text">Дистанция:</label>
                <select
                  className="select"
                  name="distance"
                  onChange={handleChange}
                >
                  <option value={3}>3 км</option>
                  <option value={5}>5 км</option>
                  <option value={10}>10 км</option>
                </select>
              </div>
              <div className="form-element">
                <label className="label-text">Взнос за участие:</label>
                <input
                  className="input checkbox-custom"
                  name="hasPayment"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
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
              <span className="participant-surname">
                {participant.surname}{" "}
              </span>
              <span className="participant-name">{participant.name} </span>
              <span className="participant-middle-name">
                {participant.middleName}{" "}
              </span>
            </div>
            {participant.hasPayment ? (
              <span className="hasPayment other-info">Взнос уплачен</span>
            ) : (
              <span className="hasPayment other-info">Взнос не уплачен</span>
            )}
            <span className="city other-info">{participant.city}</span>
            <span className="distance">{participant.distance} км</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

Participants.propTypes = {
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
      hasPayment: PropTypes.bool.isRequired,
    })
  ).isRequired,
  addParticipant: PropTypes.func.isRequired,
};

export default Participants;
