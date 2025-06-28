// client/src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: "OOMA | Nigeria's Best-Rated Will Specialist",
  description: "A tamper-proof, accessible, and cost-friendly digital will system for Africa, built on the Sui Blockchain.",
  icons: {
    icon: '/favicon.ico',
  },
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-900" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const StatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="p-2 border-gray-200 flex items-center justify-center">
            <img src="/images/logo.svg" alt="OOMA Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
            <a href="/" className="hover:text-blue-900 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-900 transition-colors">About</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Services</a>
          </div>
          <a href="/auth" className="hidden md:block bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105 shadow-sm">
            Sign Up
          </a>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4 text-gray-600 font-medium">
              <a href="/" className="hover:text-blue-900">Home</a>
              <a href="#" className="hover:text-blue-900">About</a>
              <a href="#" className="hover:text-blue-900">Services</a>
              <a href="/auth" className="mt-2 w-full text-center bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg">
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-blue-900 text-white pt-20 md:pt-24 pb-48">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              Where ancestral inheritance meets integrity
            </h1>
            <Link href="/auth">
              <button
                type="button"
                className="mt-5 bg-yellow-400 text-blue-900 font-bold py-4 px-6 rounded-lg flex items-center justify-center mx-auto transition-transform hover:scale-105 shadow-lg"
              >
                Write My Will
              </button>
            </Link>
          </div>
        </section>

        {/* Image Showcase Section */}
        <section className="container mx-auto px-6 -mt-36">
          <div className="relative h-56 sm:h-64 md:h-96">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1/3 h-4/5 bg-white shadow-2xl rounded-3xl hidden md:block overflow-hidden">
              <Image src="/images/car.jpg" alt="Family car asset" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 h-full z-10">
              <div className="relative w-full h-full shadow-2xl rounded-3xl overflow-hidden">
                <Image src="/images/family.jpg" alt="Happy multi-generational family" fill style={{ objectFit: "cover" }} />
              </div>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-4/5 bg-gray-200 shadow-2xl rounded-3xl hidden md:block overflow-hidden">
              <Image src="/images/house.jpg" alt="Family house asset" fill style={{ objectFit: "cover", borderRadius: "1.5rem" }} />
            </div>
          </div>
        </section>

        {/* Specialist & Social Proof Section */}
        <section className="py-24 md:pt-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nigeria's Best-Rated Will Specialist</h2>
                <p className="text-gray-600 leading-relaxed">
                  OOMA provides a secure, tamper-proof, and accessible digital will platform built on the Sui Blockchain. Join thousands of families who trust us to protect their legacy and ensure their wishes are honored with integrity and transparency.
                </p>
                </div>
              <div className="flex justify-center items-center space-x-8">
                <Image src="/images/sui.jpg" alt="Sui Foundation Logo" width={150} height={50} style={{ objectFit: "contain" }} />
                <Image src="/images/semicolon.jpg" alt="Semicolon Logo" width={150} height={50} style={{ objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="pb-24 bg-gray-50 pt-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-xl p-8 text-center bg-white flex flex-col justify-between transition-transform hover:-translate-y-2 shadow-sm hover:shadow-xl">
                <div>
                  <div className="flex justify-center items-center h-20 mb-4"><Image src="/images/will.png" alt="Wills Icon" width={100} height={100} style={{ objectFit: "contain" }} /></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Wills</h3>
                  <p className="text-gray-500 mb-6">Write your will from the comfort of your own home in just 15 minutes.</p>
                </div>
                <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">Write my will</a>
              </div>
              <div className="border border-gray-200 rounded-xl p-8 text-center bg-white flex flex-col justify-between transition-transform hover:-translate-y-2 shadow-sm hover:shadow-xl">
                <div>
                  <div className="flex justify-center items-center h-20 mb-4"><Image src="/images/insure.png" alt="Insurance Icon" width={100} height={100} style={{ objectFit: "contain" }} /></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Insure</h3>
                  <p className="text-gray-500 mb-6">Insure in an immutable blockchain system accessible from any location in the world.</p>
                </div>
                <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">Insure now</a>
              </div>
              <div className="border border-gray-200 rounded-xl p-8 text-center bg-white flex flex-col justify-between transition-transform hover:-translate-y-2 shadow-sm hover:shadow-xl">
                <div>
                  <div className="flex justify-center items-center h-20 mb-4"><Image src="/images/asset.png" alt="Digital Asset Icon" width={100} height={100} style={{ objectFit: "contain" }} /></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Digital Assets</h3>
                  <p className="text-gray-500 mb-6">Secure your crypto, NFTs, and other digital valuables in a single, unified estate plan.</p>
                </div>
                <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">Secure assets</a>
              </div>
            </div>
          </div>
        </section>

        {/* Phone Call Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="border-t-2 border-blue-900 pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">We're only a phone call away</h2>
                  <p className="text-gray-600 mb-8">Any questions? Our friendly specialists are here to help from 9am to 6pm, Monday to Friday.</p>
                  <div className="flex items-center space-x-4 mb-4 justify-center md:justify-start">
                    <Link href="/" className="p-4 border-gray-200 flex items-center justify-center">
                      <img src="/images/logo.svg" alt="OOMA Logo" className="h-10 w-auto" />
                    </Link>
                    <span className="font-medium text-gray-700">Talk to Us</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center md:justify-start"><PhoneIcon /><span className="text-lg font-bold text-gray-800">+2349076836965</span></div>
                    <div className="flex items-center justify-center md:justify-start"><StatusIcon /><span className="text-gray-600">Line open - give us a call</span></div>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <Image
                    src="/images/call2.png"
                    alt="Illustration of a friendly telephone"
                    width={350}
                    height={350}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-800 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="col-span-2 sm:col-span-1 mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wider">OOMA</h3>
              <div className="space-y-3 flex flex-col text-gray-600">
                <a href="#" className="hover:text-blue-900">About us</a>
                <a href="#" className="hover:text-blue-900">Blog</a>
                <a href="#" className="hover:text-blue-900">Careers</a>
                <a href="#" className="hover:text-blue-900">Security</a>
                <a href="#" className="hover:text-blue-900">What to do when one dies</a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wider">Our Services</h3>
              <div className="space-y-3 flex flex-col text-gray-600">
                <a href="#" className="hover:text-blue-900">Wills</a>
                <a href="#" className="hover:text-blue-900">Insurance</a>
                <a href="#" className="hover:text-blue-900">Digital Assets</a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wider">Contact us</h3>
              <div className="text-gray-600 leading-relaxed">
                <p>Address:</p>
                <p>6, Freetown Road,</p>
                <p>Apapa, Lagos,</p>
                <p>Nigeria</p>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wider">Follow Us</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="#" className="text-gray-500 hover:text-blue-900"> <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg> </a>
                <a href="#" className="text-gray-500 hover:text-blue-900"> <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg> </a>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
            <p>{new Date().getFullYear()} OOMA TRUST. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}