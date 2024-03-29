import * as Dialog from "@radix-ui/react-dialog"
import { CartButton } from "../cartButton/cartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";
import camiseta from "../../assets/camisetas/1.png"
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useState } from "react";

export default function Cart() {

  const { cartItems, removeCartItem, cartTotal } = useCart();
  const cartQuantity = cartItems.length;

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
            <CartButton/>
            </Dialog.Trigger>

            <Dialog.Portal>
                    <CartContent>

                    <CartClose>
                        <X size={24} weigth="bold" />
                    </CartClose>

                    <h2>Sacola de compras</h2>
                    
                    <section>
                        {cartItems.length <= 0 && (
                        <p>Parece que seu carrinho está vazio : (</p>
                        )}
                        {cartItems.map((cartItem) => (
                        <CartProduct key={cartItem.id}>
                            <CartProductImage>
                            <Image
                                width={100}
                                height={93}
                                alt=""
                                src={cartItem.imageUrl}
                            />
                            </CartProductImage>
                            <CartProductDetails>
                            <p>{cartItem.name}</p>
                            <strong>{cartItem.price}</strong>
                            <button onClick={() => removeCartItem(cartItem.id)}>
                                Remover
                            </button>
                            </CartProductDetails>
                        </CartProduct>
                        ))}
                    </section>
                    <CartFinalization>
                        <FinalizationDetails>
                            <div>
                                <span>Quantidade</span>
                                <p>
                                    {cartQuantity} {cartQuantity > 1 ? "itens" : "item"}
                                </p>                            
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>{formattedCartTotal}</p>
                            </div>
                        </FinalizationDetails>
                        <button
                            onClick={handleCheckout}
                            disabled={isCreatingCheckoutSession || cartQuantity <= 0}
                            >
                                Finalizar compra
                        </button>
                    </CartFinalization>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}