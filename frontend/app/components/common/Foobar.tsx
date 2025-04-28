import React from 'react';

const Foobar: React.FC = () => {
    return (
        <footer className="text-white p-8 mx-auto flex flex-col mt-16 text-[16px] bg-green-600 w-full max-w-[1000px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <p className="text-lg font-bold">&copy; 2024 Car Sale Platform. All rights reserved.</p>
                <ul className="flex flex-col md:flex-row gap-6 mt-4 md:mt-0">
                    <li><a href="/about" className="hover:underline hover:text-gray-200">About Us</a></li>
                    <li><a href="/contact" className="hover:underline hover:text-gray-200">Contact</a></li>
                    <li><a href="/privacy" className="hover:underline hover:text-gray-200">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:underline hover:text-gray-200">Terms of Service</a></li>
                </ul>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex gap-6">
                    <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Facebook">
                        <svg className="w-6 h-6 text-gray-200 hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Twitter">
                        <svg className="w-6 h-6 text-gray-200 hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.18 8.18 0 0 0 22 5.92a8.27 8.27 0 0 1-2.357.637 4.07 4.07 0 0 0 1.804-2.23 8.18 8.18 0 0 1-2.605.977 4.11 4.11 0 0 0-7.034 3.743A11.65 11.65 0 0 1 3.179 4.894a4.11 4.11 0 0 0 1.27 5.482 4.07 4.07 0 0 1-1.86-.511v.05a4.11 4.11 0 0 0 3.292 4.022 4.09 4.09 0 0 1-1.853.07 4.11 4.11 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.814" />
                        </svg>
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Instagram">
                        <svg className="w-6 h-6 text-gray-200 hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.25-.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Foobar;