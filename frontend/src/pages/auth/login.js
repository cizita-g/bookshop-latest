// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://127.0.0.1:8000/login/", {
//                 username,
//                 password,
//             });

//             sessionStorage.setItem("user", response.data.user);
//             alert("Login successful!");
//             router.push("/");
//         } catch (error) {
//             alert("Login failed: " + error.response?.data?.error || "Unknown error");
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.body.classList.add("bg-gray-100");
        return () => {
            document.body.classList.remove("bg-gray-100");
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", {
                username,
                password,
            });

            sessionStorage.setItem("user", response.data.user);
            alert("Login successful!");
            router.push("/");
        } catch (error) {
            alert("Login failed: " + error.response?.data?.error || "Unknown error");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SIGN IN</h2>
                <form onSubmit={handleLogin}>
                    <label className="block text-gray-700 font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="text-black w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f6bd60]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center mb-4">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-600">Remember Me</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#f6bd60] text-white font-semibold py-3 rounded-md hover:bg-[#e0a84c] transition"
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="text-center mt-4 text-gray-600">
                   
                    <p>
                        Don't Have An Account? 
                        <span 
                            className="text-[#f6bd60] cursor-pointer" 
                            onClick={() => router.push("/auth/signup")}
                        > Signup
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

