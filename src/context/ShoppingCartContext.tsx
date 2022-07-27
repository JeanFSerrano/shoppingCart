import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProps = {
    children: ReactNode
}

type cartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: cartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: CartProps) {
    const [cartItems, setCartItems] = useLocalStorage<cartItem[]>( 'shopping-cart', [])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart =() => setIsOpen(true)
    const closeCart =() => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseItemQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]

            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseItemQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return [...currItems.filter(item => item.id !== id)]

            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartQuantity,
            cartItems
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>)
}