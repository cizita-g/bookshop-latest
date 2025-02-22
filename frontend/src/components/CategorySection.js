import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";
import { useRouter } from "next/router";

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                const books = response.data;
                const categoryMap = new Map();
                const usedBooks = new Set();

                books.forEach((book) => {
                    book.categories.forEach((category) => {
                        if (!categoryMap.has(category) && !usedBooks.has(book.id)) {
                            categoryMap.set(category, book);
                            usedBooks.add(book.id);
                        }
                    });
                });

                setCategories(Array.from(categoryMap, ([category, book]) => ({ category, book })).slice(0, 8));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        getBooks();
    }, []);

    const handleCategoryClick = (category) => {
        router.push(`/category/${encodeURIComponent(category)}`);
    };

    return (
        <section className="py-10 bg-white ">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Category</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {categories.map(({ category, book }) => (
                    <div key={category} className="cursor-pointer" onClick={() => handleCategoryClick(category)}>
                        <img src={`http://127.0.0.1:8000/media/${book.cover_image}`} alt={book.title} className="w-48 h-64 object-cover mx-auto rounded-lg" />
                        <p className="text-purple-600 font-semibold mt-2">{category}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
