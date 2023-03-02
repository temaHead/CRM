import React, { useState } from 'react';
import Requiest from '../requests/types/Request';
import style from './Card.module.css';

type CardProps = {
  item: Requiest;
  onDelete: (id: string) => void;
  onChange: (newRequest: {}) => void;
};
function Card(props: CardProps): JSX.Element {
  const { item, onDelete, onChange } = props;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(item.name);
  const [number, setNumber] = useState(item.contact);
  const [styleCard, setStyleCard] = useState('160px');

  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);

  let text;
  if (item.description.length > 10) {
    text = item.description.slice(0, 10) + '...';
  } else {
    text = item.description;
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(event.target.value);
  };

  const handleDelete = (event: React.MouseEvent): void => {
    event.preventDefault();
    onDelete(item.id);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNumber(event.target.value);
  };

  const handleEditClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    if (edit) {
      const newRequest = {
        id: item.id,
        name,
        description,
        status,
        date: new Date().toLocaleString(),
        manager: item.manager,
        contact: item.contact,
        time: new Date().getTime(),
      };
      onChange(newRequest);
    }
    setEdit(!edit);
    if (styleCard === '160px') {
      setStyleCard('300px');
    } else {
      setStyleCard('160px');
    }
  };
  return (
    <div className={style.card} style={{ height: styleCard }}>
      {!edit ? (
        <div className={style.cardbox} onClick={handleEditClick}>
          <div className={style.cardText}>Номер заявки: {item.id}</div>
          <div className={style.cardText}>Менеджер: {item.manager}</div>
          <div className={style.cardText}> Имя клиента: {item.name}</div>
          <div className={style.cardText}> {item.date}</div>
        </div>
      ) : (
        <>
          <div className={style.box}>
            <input type='text' placeholder='Имя клиента' maxLength={100} value={name} onChange={handleNameChange} required />

            <textarea className={style.textareaEdit} placeholder='opisanie' value={description} onChange={handleDescriptionChange} />
            <input type='tel' placeholder='Номер телефона' maxLength={12} value={number} onChange={handleNumberChange} required />
            <select onChange={handleStatusChange} defaultValue='qweewer'>
              {' '}
              status
              <option>Сменить статус</option>
              <option value='В обработке'>В обработке</option>
              <option value='В работе'>В работе</option>
              <option value='Закрыта'>Закрыта</option>
            </select>
          </div>
          <div className={style.buttonBox}>
            <button onClick={handleEditClick}>Сохранить</button>
            <button onClick={handleDelete}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
