import "../styles/globals.css";

import { CartProvider } from "../context/CartContext";  // ✅ Ensure correct import

function MyApp({ Component, pageProps }) {
    

    return (
        <CartProvider>
            
            <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp;
