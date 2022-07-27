import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

type Props = {

    id: number
    name: string
    price: number
    imgUrl: string
    
   
}

export const formatCurrency = (number: number) => {
    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}


const StoreProduct = ({ id, name, price, imgUrl }: Props) => {

    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCart()

    const quantity = getItemQuantity(id)

    return (
        <Card>
            <Card.Img
                variant='top'
                src={imgUrl}
                height='200px'
                style={{ objectFit: 'cover' }}
            />

            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className="fs-5">{name}</span>
                    <span className="ms-2 text-muted fs-6">{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? <Button className='w-100' onClick={() => increaseItemQuantity(id)}> Adicionar ao carrinho</Button>

                        : (<div className="d-flex align-items-center flex-column" style={{ gap: '0.5rem' }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: '0.5rem' }} >
                                <Button onClick={() => decreaseItemQuantity(id)} >-</Button>
                                <div>
                                    <span className="fs-5">{quantity} no carrinho</span>
                                </div>
                                <Button onClick={() => increaseItemQuantity(id)}>+</Button>
                            </div>
                            <Button variant='danger' size='sm' onClick={() => removeFromCart(id)}>Remover</Button>
                        </div>)}
                </div>
            </Card.Body>
        </Card>

    );
}
export default StoreProduct;