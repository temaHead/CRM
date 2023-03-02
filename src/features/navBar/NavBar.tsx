import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './NavBar.module.css';

function NavBar() {
  const [manager, setManager] = useState('Антон');
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(true);
  const handleClick = (): void => {
    setEdit(!edit);
  };
  const changeManager = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setManager(event.target.value);
  };

  const handleShow = () => {
    setShow(false);
  };
  
  return (
    <>
      <div className={style.navigate}>
        <div className={style.container}>
          <div className={style.manager}>
            Добро пожаловать, 
            <div className={style.name} onClick={handleClick}>
              {' '}
              {manager}
            </div>
            !
          </div>
          {edit && (
            <div>
              <input type='text' value={manager} onChange={changeManager} />
              <button onClick={handleClick}>Сохранить</button>
            </div>
          )}
        </div>

        <div className={style.containerLinks}>
          <div className={style.link}>
            <Link to='/all-requests' onClick={handleShow}>
              Все заявки
            </Link>
          </div>
          <div className={style.link}>
            <Link to='/new-request' onClick={handleShow}>
              Создать заявку
            </Link>
          </div>
        </div>
      </div>
      {show ? (
        <div className={style.navBarShow}>
          <div>Для начала работы необходимо выбрать раздел:</div>
          <div className={style.linkShow}>
            <div className={style.link}>
              <Link to='/all-requests' onClick={handleShow}>
                Все заявки
              </Link>
            </div>
            <div className={style.link}>
              <Link to='/new-request' onClick={handleShow}>
                Создать заявку
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Outlet context={manager} />
      )}
    </>
  );
}

export default NavBar;
