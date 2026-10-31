
import './App.css';
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import UpdateForm from './components/UpdateForm';
import ViewForm from './components/ViewForm';
import FitnessForm from './components/FitnessForm';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <div>
       
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
          <Link className="navbar-brand" to="/home">Fit Nest</Link>
        </nav>

        <Routes>
          <Route path = "/home" element = {<Home/>} />
          <Route path = "/" element = {<Home/>} />
          <Route path = "/fitness-form" element = {<FitnessForm/>} />
          <Route path = "/view-form" element = {<ViewForm/>} />
          <Route path = "/update-form/:joiningId" element = {<UpdateForm/>} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
