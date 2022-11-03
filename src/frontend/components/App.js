import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Committee from './Registration/Committee';
import Login from './Login.js';
import Register from './Registration/Register.js';
import Customer from './Registration/Customer';
import Welcome from './Welcome.js';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />}>
          <Route index element={<Customer />} />
          <Route path='customer' element={<Customer />} />
          <Route path='committee' element={<Committee />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
