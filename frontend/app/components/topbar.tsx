
import React from 'react';
import Link from 'next/link';

const Topbar: React.FC = () => {
    return (
        <nav className="flex pl-8 text-white text-xs items-center justify-between ">
            <ul className="flex space-x-0.5 header-menu">
                <li><a href="/vali" className="hover:underline">Vali automark</a></li>
                <li><a href="/vali" className="hover:underline">Uued sõidukid</a></li>
                <li><a href="/vali" className="hover:underline">Sõidukite kuulutused</a></li>
                <li><a href="/vali" className="hover:underline">Kaubad ja varuosad</a></li>
                <li><a href="/vali" className="hover:underline">Rent</a></li>
                <li><a href="/vali" className="hover:underline">Firmad ja teenused</a></li>
                <li><a href="/vali" className="hover:underline">Uudised</a></li>
                <li><a href="/vali" className="hover:underline">Foorumid</a></li>
                <li><a href="/vali" className="hover:underline">Finantseerimine</a></li>
                <li><a href="/vali" className="hover:underline">Ostuabi</a></li>
                <li><a href="/vali" className="hover:underline">Minu konto</a></li>
            </ul>
        </nav>
    );
};

export default Topbar;