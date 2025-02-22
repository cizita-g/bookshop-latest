const NewsletterSection = () => {
    return (
        <section className="relative bg-cover bg-center h-80 text-white" style={{ backgroundImage: "url('/bookblog1.jpg')", backgroundSize: "contain" }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-end px-6 h-full">
                <div className="text-right">
                    <h2 className="text-2xl font-semibold mb-4">Subscribe For Latest Updates</h2>
                    <div className="flex w-full md:w-auto">
                        <input
                            type="email"
                            placeholder="enter your email"
                            className="p-3 rounded-l-md text-black w-full md:w-80 focus:outline-none"
                        />
                        <button className="bg-[#f6bd60] text-white px-6 py-3 rounded-r-md font-semibold hover:bg-[#e0a84c] transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
