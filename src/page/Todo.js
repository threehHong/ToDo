import { useEffect, useState } from 'react';
import Form from '../component/Form';
import List from '../component/List';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todo';

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const patchToDoList = (e) => {
      // getTodos API
      todoApi.getTodos()
        .then((res) => {
          setTodo(res.data);
          setValue("");
        })
        .catch(err => console.log(err));
  }
  
  // 토큰이 없을 경우 signin 페이지로 이동.
  // 그렇지 않을 경우 TodoList 출력.
  useEffect(() => {
    if(!accessToken) {
      navigate('/signin');
    } else {
      patchToDoList();
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!value) {
      alert('해야할 일을 입력하세요');
    } else {
      // createTodo API
      todoApi.createTodo(value)
        .then((res) => {
          console.log(res)
        })
        .catch(err => console.log(err));

        patchToDoList();
    }
  }

  return (
    <div /* style={{ width: '1000px', margin: '50px auto' }} */>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <List todo={todo} setTodo={setTodo} />
    </div>
  );
}