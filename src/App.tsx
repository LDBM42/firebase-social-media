
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { Path } from './resources/path';
import { CreatePost } from './pages/create-post/create-post';



function App() { 

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path={Path.home} element={<Main />}/>
          <Route path={Path.login} element={<Login />}/>
          <Route path={Path.createpost} element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
