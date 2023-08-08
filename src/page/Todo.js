import { useState } from 'react';
import Form from '../component/Form';
import List from '../component/List';
import axios from 'axios';

/* const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop/'; */

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  
  let newTodo = {
    id: Date.now(),
    title: value,
    completed: false,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTodo([...todo, newTodo])
    setValue("");

    /* await axios.post(SERVER_URL, {todo}).catch(error => console.log(error)) */
  }

  return (
    <div style={{ width: '1200px', margin: '50px auto' }}>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <List todo={todo} setTodo={setTodo} />
    </div>
  );
}