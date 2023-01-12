import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import Home from './component/Home/Home';
import ResetPass from './component/ResetPass/ResetPass';
import Profile from './component/Profile/Profile';
import ListCourses from './component/ListCourses/ListCourses';
import DetailCourses from './component/DetailCourses/DetailCourses';
import DetailLessons from './component/DetailLessons/DetailLessons';
import NotFound from './component/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpass' element={<ResetPass />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/listcourses' element={<ListCourses />} />
          <Route path='/detail/listcourses/:id' element={<DetailCourses />} />
          <Route path='/detail/listcourses/lessons/:id/:index' element={<DetailLessons />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
