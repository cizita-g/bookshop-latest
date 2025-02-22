import { useEffect, useState } from "react";
import { fetchBooks } from "../utils/api";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import FeaturedBooks from "./FeaturedBooks";
import NewsletterSection from "./NewsLetterSection";
import CategorySection from "./CategorySection";
import DealOfTheDay from "./DealOfTheDay";
import NewArrivals from "./NewArrivals";
import BlogsSection from "./BlogsSection";
import Footer from "./Footer";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetchBooks();
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        getBooks();
    }, []);

    if (loading) {
        return <p>Loading books...</p>;
    }

    return (
        <div>
            <Navbar />
            <div id="home">
                <HeroSection books={books} />
            </div>
                <BenefitsSection />
            <div id="featured">
                <FeaturedBooks />
            </div>
                <NewsletterSection />
            <div id="category">
                <CategorySection />
            </div>
                <DealOfTheDay />
            <div id="explore">
                <NewArrivals />
            </div>
            <div id="blogs">
                <BlogsSection />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
