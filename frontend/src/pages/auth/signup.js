// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Signup = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://127.0.0.1:8000/register/", {
//                 username,
//                 email,
//                 password,
//             });
//             alert("Signup successful! Please login.");
//             router.push("/auth/login");
//         } catch (error) {
//             alert("Signup failed: " + error.response?.data?.error || "Unknown error");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SIGN UP</h2>
//                 <form onSubmit={handleSignup}>
//                     <label className="block text-gray-700 font-semibold mb-1">Username</label>
//                     <input
//                         type="text"
//                         placeholder="Enter your username"
//                         className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
                    
//                     <label className="block text-gray-700 font-semibold mb-1">Email</label>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
                    
//                     <label className="block text-gray-700 font-semibold mb-1">Password</label>
//                     <input
//                         type="password"
//                         placeholder="Enter your password"
//                         className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
                    
//                     <button
//                         type="submit"
//                         className="w-full bg-[#f6bd60] text-white font-semibold py-3 rounded-md hover:bg-[#e0a84c] transition"
//                     >
//                         Sign Up
//                     </button>
//                 </form>
                
//                 <div className="text-center mt-4 text-gray-600">
//                     <p>
//                         Already have an account? 
//                         <span 
//                             className="text-[#f6bd60] cursor-pointer" 
//                             onClick={() => router.push("/auth/login")}
//                         > Login
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const router = useRouter();

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/; // 1 uppercase, 1 special char, min 8 chars

    const validateInputs = () => {
        let emailError = emailRegex.test(email) ? "" : "Invalid email format";
        let passwordError = passwordRegex.test(password)
            ? ""
            : "Password must be at least 8 characters, contain 1 uppercase letter and 1 special character";
        
        setErrors({ email: emailError, password: passwordError });

        return emailError === "" && passwordError === "";
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return; // Only validate on form submission

        try {
            await axios.post("http://127.0.0.1:8000/register/", {
                username,
                email,
                password,
            });
            alert("Signup successful! Please login.");
            router.push("/auth/login");
        } catch (error) {
            alert("Signup failed: " + (error.response?.data?.error || "Unknown error"));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SIGN UP</h2>
                <form onSubmit={handleSignup}>
                    <label className="block text-gray-700 font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`text-black w-full p-3 mb-2 border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className={`text-black w-full p-3 mb-2 border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#f6bd60] text-white font-semibold py-3 rounded-md hover:bg-[#e0a84c] transition"
                    >
                        Sign Up
                    </button>
                </form>
                
                <div className="text-center mt-4 text-gray-600">
                    <p>
                        Already have an account?{" "}
                        <span 
                            className="text-[#f6bd60] cursor-pointer" 
                            onClick={() => router.push("/auth/login")}
                        > Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
