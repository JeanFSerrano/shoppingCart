import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Products from '../data/products.json'
import { formatCurrency } from "./StoreProduct";

type Props = {
    id: number
    quantity: number
}

const CarItem = ({ id, quantity }: Props) => {

    const item = Products.find(i => i.id === id)
    if (item == null) return null

    const { removeFromCart, increaseItemQuantity, decreaseItemQuantity } = useShoppingCart()

    return (

        <Stack direction='horizontal' gap={2} className="d-flex align-items-center ">
            <img
                src={item.imgUrl}
                style={{ width: '125px', height: '75px', objectFit: 'cover' }}

            />

            <div className="me-auto">
                <div>
                    {item.name}
                    {quantity > 1 &&
                        <p
                            className="text-muted"
                            style={{ fontSize: '.75rem' }}> {quantity} unidades
                        </p>}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <Button variant="success" size='sm' onClick={() => increaseItemQuantity(item.id)}> + </Button>
            <Button variant="outline-warning" size='sm' onClick={() => decreaseItemQuantity(item.id)}> - </Button>
            <Button variant="outline-danger" size='sm' onClick={() => removeFromCart(item.id)}>&times; </Button>
        </Stack>

    )
}
export default CarItem;