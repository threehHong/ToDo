import { useState } from 'react';
import Form from './component/Form';
import List from './component/List';

function App() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  
  let newTodo = {
    id: Date.now(),
    title: value,
    completed: false,
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo([...todo, newTodo])
    setValue("");
  }

  return (
    <div style={{ width: '1200px', margin: '50px auto' }}>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <List todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
