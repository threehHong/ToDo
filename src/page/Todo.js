import { useEffect, useState } from 'react';
import Form from '../component/Form';
import List from '../component/List';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  
  const accessToken = localStorage.getItem("access_token");
  /* const navigate = useNavigate(); */

  const patchToDoList = async (e) => {
      try {
        const responseGetTodos = await axios.get(`${SERVER_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        console.log(responseGetTodos.data);
        
        setTodo(responseGetTodos.data)
        setValue("");
      } catch (error) {
          console.log("error message:", error);
      }
  }
  

  
  useEffect(() => {
    patchToDoList();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!value) {
      alert('해야할 일을 입력하세요');
    } else {
      try {
        const response = await axios.post(`${SERVER_URL}/todos`, {todo: value}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        console.log(response.data);
  
        patchToDoList();
  
      } catch (error) {
          console.log("error message:", error);
      }
    }
  }

  return (
    <div style={{ width: '1200px', margin: '50px auto' }}>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <List todo={todo} setTodo={setTodo} />
    </div>
  );
}