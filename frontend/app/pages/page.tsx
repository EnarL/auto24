// frontend/pages/page.tsx
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const Page: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex space-x-4 justify-center">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
            <main className="flex-grow p-8">
                <h1 className="text-3xl font-bold mb-4">Car Sale Platform</h1>
                <p className="mb-8">Welcome to the car sale platform. Browse and find your dream car!</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Popular Car Marks</h2>
                    <ul className="list-disc list-inside">
                        <li>Toyota</li>
                        <li>Ford</li>
                        <li>BMW</li>
                        <li>Mercedes</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Search for Cars</h2>
                    <input type="text" placeholder="Search for cars..." className="border p-2 w-full" />
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Example Car</h2>
                    <div className="border p-4">
                        <img src="/path/to/car-image.jpg" alt="Example Car" className="w-full h-auto mb-4" />
                        <p className="font-semibold">Car Model: Example Car</p>
                        <p>Price: $20,000</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Page;