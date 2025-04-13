import React from 'react';

const Affiliate = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-teal-500 text-white py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Affiliate Program</h1>
                    <p className="mt-2">Join our affiliate program and start earning today!</p>
                </div>
            </header>

            <main className="container mx-auto py-10 px-4">
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Why Join Our Affiliate Program?</h2>
                    <p className="text-lg">Our affiliate program offers competitive commissions, real-time tracking, and a dedicated support team to help you succeed.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Sign up for our affiliate program.</li>
                        <li>Share your unique affiliate link with your audience.</li>
                        <li>Earn commissions for every successful referral.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                    <p className="text-lg">Ready to join? Click the button below to sign up and start earning!</p>
                    <div className="mt-6">
                        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition">Sign Up Now</button>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Your Company. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Affiliate;