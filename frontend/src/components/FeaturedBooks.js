import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BookCard from "./BookCard";

const FeaturedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                setBooks(response.data.slice(0, 10)); // Show only 10 books
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        getBooks();
    }, []);

    return (
        <section className="py-10 bg-white">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Featured Books</h2>
            <div className="max-w-6xl mx-auto justify-around">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    className="mySwiper"
                >
                    {books.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedBooks;
