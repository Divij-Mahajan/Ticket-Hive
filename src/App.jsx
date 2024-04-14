import './App.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import Home from './home'
import Header from './components/Header-Footer/header'
import Company from './company'
import Explore from './explore'
import Event from './event'
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/:category" element={<Explore />} />
        <Route path="/:category/:id" element={<Event />} />
      </Routes>
    </Router>
  )
}

export default App
