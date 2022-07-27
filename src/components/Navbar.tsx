
import { Button, Container, Nav, Navbar as NavBarBs } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Navbar = () => {

    const { openCart, cartQuantity } = useShoppingCart()

    return (

        <NavBarBs sticky='top' className='bg-dark shadow-sm mb-3'>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link to='/store' as={NavLink} className='text-light'>Shopping Cart </Nav.Link>
                    
                </Nav>
                {cartQuantity > 0 &&

                    (<Button
                        onClick={openCart}
                        variant='outline-primary'
                        style={{ width: '4rem', height: '3rem', position: 'relative' }}
                        className='rounded'>

                        <FaShoppingCart
                            style={{ backgroundColor: 'transparent', width: '25px', height: '40px' }}
                        />

                        <div
                            className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                            style={{ color: 'white', width: '1.5rem', height: '1.5rem', position: 'absolute', bottom: '0', right: '0', transform: 'translate(25%, 25%' }}>

                            {cartQuantity}

                        </div>

                    </Button>)}

            </Container>

        </NavBarBs >

    )
}
export default Navbar;