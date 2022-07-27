import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Store from './pages/Store'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ShoppingCartProvider } from './context/ShoppingCartContext'



function App() {

  return (

    <ShoppingCartProvider>
      <Navbar />
      <Container className=''>
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>

      </Container>


    </ShoppingCartProvider>)

}

export default App
