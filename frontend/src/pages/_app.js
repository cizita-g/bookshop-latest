import "../styles/globals.css";

import { CartProvider } from "../context/CartContext";  // ✅ Ensure correct import

function MyApp({ Component, pageProps }) {
    console.log("🚀 CartProvider is wrapping the app!");  // ✅ Debugging

    return (
        <CartProvider>
            
            <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp;
