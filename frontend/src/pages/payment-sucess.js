import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const PaymentSuccess = () => {
    const { cart, setCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        alert("Payment Successful! 🎉");
        setCart([]); // Clear cart after payment
        localStorage.removeItem("cart");
        router.push("/");
    }, []);

    return (
        <div>
            <h1>🎉 Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
        </div>
    );
};

export default PaymentSuccess;
