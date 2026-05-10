import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Access from './pages/Access'
import Analyze from './pages/Analyze'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/access" element={<Access />} />
        <Route
          path="/analyze"
          element={
            <PrivateRoute>
              <Analyze />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
