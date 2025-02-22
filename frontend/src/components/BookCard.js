import Link from "next/link";
import { useCart } from "../context/CartContext";

const BookCard = ({ book }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 text-center min-w-[200px] h-[350px] flex flex-col justify-between overflow-hidden">
            <Link href={`/book/${book.id}`} className="block cursor-pointer hover:shadow-xl transition">
                <img src={`http://127.0.0.1:8000/media/${book.cover_image}`} alt={book.title} className="w-36 h-52 object-cover mx-auto" />
                <h3 className="text-lg font-semibold text-black mt-2 truncate w-full px-2">{book.title}</h3>
                <p className="text-black text-sm">Rs.{book.is_on_sale ? book.sale_price : book.original_price} {book.is_on_sale && <span className="line-through text-gray-400">Rs.{book.original_price}</span>}</p>
            </Link>
            <button
                onClick={() => addToCart(book)}
                className="bg-[#f6bd60] text-white font-semibold px-4 py-2 rounded-md mt-2 w-full hover:bg-[#e88374] transition"
            >
                Add To Cart
            </button>
        </div>
    );
};

export default BookCard;
