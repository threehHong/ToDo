import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Signup from './page/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginForm />}> </Route> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
