
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight">
                Fuzzy Vocal Range Analyzer
            </h1>
            <p className="mt-2 text-lg text-brand-subtext">
                Cek kecocokan antara rentang vokal lagu dan penyanyi.
            </p>
        </header>
    );
};

export default Header;
