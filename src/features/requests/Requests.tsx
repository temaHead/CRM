import { useAppDispatch } from '../../store';
import {  requestChange, requestDeleted } from './requestsSlice';
import style from './Requests.module.css';
import Card from '../card/Card';
import RequestState from './types/RequestState';
import Request from './types/Request';

function Requests({ requests }: RequestState) {
  const newRequestsAll = requests.filter((el) => el.status === 'Новая').sort((a, b) => a.time - b.time);
  const workRequestsAll = requests.filter((el) => el.status === 'В работе').sort((a, b) => a.time - b.time);
  const processingRequestsAll = requests.filter((el) => el.status === 'В обработке').sort((a, b) => a.time - b.time);
  const closedRequestsAll = requests.filter((el) => el.status === 'Закрыта').sort((a, b) => a.time - b.time);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string): void => {
    dispatch(requestDeleted(id));
  };
  const handleChange = (newRequest: any): void => {
    dispatch(requestChange(newRequest));
  };
  return (
    <div className={style.containerRequests}>
      <div className={style.table}>
        <div className={style.new}>
          <div className={style.title}>
            Новые {newRequestsAll.length > 0 && <div className={style.notification}>{newRequestsAll.length}</div>}
          </div>
          {newRequestsAll.map((item) => (
            <Card key={item.id} item={item} onDelete={handleDelete} onChange={handleChange} />
          ))}
        </div>
        <div className={style.inProcessing}>
          <div className={style.title}>
            В обработке{processingRequestsAll.length > 0 && <div className={style.notification}>{processingRequestsAll.length}</div>}
          </div>

          {processingRequestsAll.map((item) => (
            <Card key={item.id} item={item} onDelete={handleDelete} onChange={handleChange} />
          ))}
        </div>
        <div className={style.inWork}>
          <div className={style.title}>
            В работе {workRequestsAll.length > 0 && <div className={style.notification}>{workRequestsAll.length}</div>}
          </div>

          {workRequestsAll.map((item) => (
            <Card key={item.id} item={item} onDelete={handleDelete} onChange={handleChange} />
          ))}
        </div>
        <div className={style.closed}>
          <div className={style.title}>
            Закрытые <div className={style.notification}>{closedRequestsAll.length}</div>
          </div>

          {closedRequestsAll.map((item) => (
            <Card key={item.id} item={item} onDelete={handleDelete} onChange={handleChange} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Requests;
