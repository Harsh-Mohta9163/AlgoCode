import React from 'react';
import { CheckCircle } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="container mx-auto py-8 px-4 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Algo University. A project designed to accelerate your interview prep.</p>
                <p className="text-sm mt-2">All questions are sourced from public collections for educational purposes.</p>
            </div>
        </footer>
    );
}
export default Footer;