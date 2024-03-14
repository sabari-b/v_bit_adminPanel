import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Login from './pages/login';
import ForgotPassword from './pages/forgetPass';
import ResetPassword from './pages/resetPass';
import DashboardRenderer from './pages/DashboardRender';
import LoginRenderer from './pages/LoginRender';
import Error from './pages/404';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                {/* <Route exact path='/' element={<Login/>} /> */}
                <Route exact path='/' element={<LoginRenderer/>} />
                <Route exact path='/forgot-password' element={<ForgotPassword/>} />
                <Route exact path='/forgotPass/:token' element={<ResetPassword/>} />
                {/* <Route exact path='/dashboard' Component={<Dashboard/>} /> */}
                <Route exact path='/dashboard' element={<DashboardRenderer/>} />
                <Route exact path='/history' element={<DashboardRenderer/>} />
                <Route exact path='*' element={<Error/>} />
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
