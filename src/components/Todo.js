import { useState, useEffect } from 'react';
import Input from './Input';
import useInput from '../util/useInput';
import uuid from 'react-uuid';
import '../App.css';

/**
 *
 * {
 * id: uuid(),
 * todo: '~~~~',
 * edit: false,
 * done: false
 * }
 */

const url = 'http://localhost:3001/data/';
const update = e =>
  fetch(url + e.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(e),
  });

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [entryValue, entryBind, entryReset] = useInput('');
  const [editValue, editBind, editReset, editInit] = useInput('');

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setTodoList(data);
        });
    };
    fetchData();
  }, []);

  const addToList = () => {
    if (entryValue === '') return;
    const newTodoList = [...todoList];
    const theEntry = {
      id: uuid(),
      todo: entryValue,
      edit: false,
      done: false,
    };
    newTodoList.push(theEntry);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theEntry),
    });
    setTodoList(newTodoList);
    entryReset();
  };

  const editEntry = id => {
    const entry = todoList.find(e => e.id === id);
    if (entry.edit === false) {
      setTodoList(
        todoList.map(e => {
          if (e.id === id) {
            e.edit = true;
          }
          return e;
        })
      );
    } else {
      setTodoList(
        todoList.map(e => {
          if (e.id === id && editValue !== '') {
            e.edit = false;
            e.todo = editValue;
          }
          update(e);
          return e;
        })
      );
      editReset();
    }
  };

  const deleteEntry = id => {
    fetch(url + id, { method: 'DELETE' });
    setTodoList(todoList.filter(e => e.id !== id));
  };

  const onCheck = id => {
    setTodoList(
      todoList.map(e => {
        if (e.id === id) e.done = !e.done;
        update(e);
        return e;
      })
    );
  };

  return (
    <div>
      <header>해야 할 일이 있나요?</header>
      <Input placeHolder={'할 일 적어보기...'} value={entryBind} />
      <button onClick={() => addToList()}>+</button>
      {todoList.map(e => {
        return (
          <div key={e.id}>
            <input
              type="checkbox"
              checked={e.done}
              onChange={() => onCheck(e.id)}
            ></input>
            {e.edit ? (
              <Input placeHolder={'할 일 적어보기...'} value={editBind} />
            ) : (
              <span className={e.done ? 'done' : ''}>{e.todo}</span>
            )}
            {e.edit ? (
              <button onClick={() => editEntry(e.id)}>완료</button>
            ) : (
              <button
                onClick={() => {
                  if (todoList.filter(e => e.edit === true).length === 0) {
                    editEntry(e.id);
                    editInit(e.todo);
                  }
                }}
              >
                수정
              </button>
            )}

            <button onClick={() => deleteEntry(e.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
