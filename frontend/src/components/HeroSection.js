const HeroSection = ({ books }) => {
    return (
        <section className="bg-gray-100 py-20 mt-10 flex items-center justify-center">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                {/* Left Text Section */}
                <div className="text-center md:text-left md:w-1/2 px-6">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Upto 75% Off</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Attention, Book Lovers! Dive Into Our Vast Collection Of Books With Amazing
                        Discounts That Make Your Next Read Even More Rewarding!
                    </p>
                    <button
    onClick={() => {
        const section = document.getElementById("explore");
        if (section) {
            const offset = 80; // Adjust for navbar height
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }}
    className="bg-[#f6bd60] text-white font-semibold px-6 py-3 rounded-md text-lg hover:bg-[#e0a84c] transition"
>
    Shop Now
</button>
                </div>

                {/* Right Image Section */}
                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <div className="relative flex gap-4">
                        {books.slice(0, 3).map((book, index) => (
                            <img
                                key={index}
                                // src={`http://127.0.0.1:8000/media/${book.cover_image}`}
                                src={`http://127.0.0.1:8000/media/${book.cover_image}`}
                                alt={book.title}
                                className={`w-36 h-52 object-cover shadow-lg ${index === 1 ? 'border-4 border-red-500' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
