import Link from "next/link";

const DealOfTheDay = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                {/* Left Side Text */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-[#f6bd60]">Deal Of The Day</h3>
                    <h2 className="text-4xl font-bold text-gray-900 my-2">Upto 50% Off</h2>
                    <p className="text-gray-600">Checkout Before This Deal Expires At Midnight.</p>
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
                
                {/* Right Side Image */}
                <div className="md:w-1/2 flex justify-end">
                    <img src="/summerbooks.avif" alt="Deal of the Day" className="w-full max-w-lg rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;