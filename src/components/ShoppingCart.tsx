import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

import CartItem from '../components/CartItem'
import { formatCurrency } from "./StoreProduct";
import Products from '../data/products.json'


type Props = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: Props) => {

    const { closeCart, cartItems } = useShoppingCart()

    return (

        <Offcanvas show={isOpen} onHide={closeCart} placement='end' >
            <Offcanvas.Header closeButton />
            <Offcanvas.Title className='ms-3'>Itens no Carrinho</Offcanvas.Title>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item}
                        />))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = Products.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>

        </Offcanvas>

    );
}
export default ShoppingCart;