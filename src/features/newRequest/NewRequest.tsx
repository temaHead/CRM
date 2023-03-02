import React, { useId, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { requestAdd } from '../requests/requestsSlice';
import { selectRequests } from '../requests/selectors';
import style from './NewRequest.module.css';
function NewRequest() {
  const manager: any = useOutletContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [opisanie, setOpisanie] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('+7');
  const [status, setStatus] = useState('Новая');
  const requests = useSelector(selectRequests);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleOpisanieChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setOpisanie(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNumber(event.target.value);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(event.target.value);
  };

  const id = requests.length + 1;

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (number.length < 12) {
      alert('Необходимо заполнить номер телефона');
    } else {
      const newRequest = {
        id,
        name,
        contact: number,
        manager,
        date:new Date().toLocaleString(),
        status,
        description: opisanie,
        time: new Date().getTime(),
      };
      dispatch(requestAdd(newRequest));
      navigate('/all-requests');
    }
  };
  return (
    <div className={style.containerForm}>
      <form className={style.formBox} onSubmit={handleSubmit}>
        <input type='text' placeholder='Имя клиента' maxLength={100} value={name} onChange={handleNameChange} required />
        <textarea
          className={style.textarea500}
          placeholder='Описание заявки (максимум 500 символов)'
          maxLength={500}
          value={opisanie}
          onChange={handleOpisanieChange}
          required
        />
        {/* <input type='datetime-local' placeholder='date' value={date} onChange={handleDateChange} required /> */}
        <input type='tel' placeholder='Номер телефона' maxLength={12} value={number} onChange={handleNumberChange} required />
        <input type='text' placeholder='manager' defaultValue={manager} required />
        <select onChange={handleStatusChange}>
          {' '}
          status
          <option value='Новая'>Новая</option>
          <option value='В работе'>В работе</option>
          <option value='В обработке'>В обработке</option>
          <option value='Закрыта'>Закрыта</option>
        </select>
        <button type='submit'>Сохранить</button>
      </form>
    </div>
  );
}

export default NewRequest;
