import { FaTruck, FaLock, FaRedo } from "react-icons/fa";

const BenefitsSection = () => {
    return (
        <section className="flex justify-around items-center gap-16 py-10 bg-white">
            {/* Free Shipping */}
            <div className="flex items-center gap-4">
                <FaTruck className="text-[#f6bd60] text-4xl" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Free Shipping</h3>
                    <p className="text-gray-600 text-sm">Order Over Rs.1500</p>
                </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-4">
                <FaLock className="text-[#f6bd60] text-4xl" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Secure Payment</h3>
                    <p className="text-gray-600 text-sm">100% Secure Payment</p>
                </div>
            </div>

            {/* Easy Returns */}
            <div className="flex items-center gap-4">
                <FaRedo className="text-[#f6bd60] text-4xl" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Easy Returns</h3>
                    <p className="text-gray-600 text-sm">10 Days Returns</p>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
