import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './home'
import Header from './components/Header-Footer/header'
import Company from './company'
import Explore from './explore'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/:category" element={<Explore />} />
      </Routes>
    </Router>
  )
}

export default App
