import { useEffect, useState } from 'react';
import Form from '../component/Form';
import List from '../component/List';
import axios from 'axios';

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const accessToken = localStorage.getItem("access_token");
  

  const patchToDoList = async (e) => {
    const responseGetTodos = await axios.get(`${SERVER_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(responseGetTodos.data);

    /* let newTodo = {
      todo: value,
    } */
    
    setTodo(responseGetTodos.data)
    setValue("todo");
  }

  useEffect(() => {
    patchToDoList();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/todos`, {todo: value}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      console.log(response.data);

      // let newTodo = {
      //   todo: value,
      // }
  
      // setTodo([...todo, newTodo])
      // setValue("");
      

      /* localStorage.setItem("access_token", response.data.access_token); */
      
      /* if (localStorage.getItem("access_token")) {
          navigate("/todo");
      } */

      /* useEffect(() => {
      }, []); */
      
      patchToDoList();

    } catch (error) {
        console.log("error message:", error);
    }

      /* await axios.post(SERVER_URL, {todo}).catch(error => console.log(error)) */
    }

  return (
    <div style={{ width: '1200px', margin: '50px auto' }}>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <List todo={todo} setTodo={setTodo} />
    </div>
  );
}