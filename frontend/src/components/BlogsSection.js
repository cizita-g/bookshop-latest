import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

const blogs = [
    {
        title: "The Joy Of Rereading",
        author: "Winston Schmidt",
        description: "There’s something special about revisiting old favorites. Rereading can deepen your understanding and appreciation of a book.",
        image: "/bookblog4.jpg",
        link: "#"
    },
    {
        title: "The Rise Of Audiobooks",
        author: "Cizita Gautam",
        description: "Audiobooks have gained immense popularity in recent years. Here’s why you might want to give them a try...",
        image: "/audiobooks.jpg",
         link: "#"
    },
    {
        title: "Must-Read Classics",
        author: "Jessica Day",
        description: "Classics are timeless for a reason! Here are five essential reads that every book lover should experience...",
        image: "/bookblog5.jpg",
         link: "#"
    },
    {
        title: "How To Build A Reading Habit",
        author: "Nick Carraway",
        description: "Building a reading habit can be life-changing. Here’s a step-by-step guide to make reading a daily ritual...",
        image: "/bookblog3.jpg",
         link: "#"
    }
];

const BlogsSection = () => {
    return (
        <section className="py-10 bg-white">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Blogs</h2>
            
            <div className="max-w-6xl mx-auto">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    className="mySwiper"
                >
                    {blogs.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col">
                                <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm">By {blog.author}</p>
                                    <p className="text-gray-700 text-sm mt-2 flex-grow">{blog.description}</p>
                                    <div className="mt-auto">
                                        <Link href={blog.link}>
                                            <button className="bg-[#f6bd60] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#e0a84c] transition w-full">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default BlogsSection;