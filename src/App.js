import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Todo from './page/Todo';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Home from './page/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
