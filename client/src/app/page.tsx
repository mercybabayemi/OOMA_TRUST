// file: client/src/app/page.tsx

import Image from 'next/image';
import Head from 'next/head';

// --- Reusable Icon Components for Cleaner Code ---

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


// --- Main Page Component ---

export default function HomePage() {
  return (
    <>
      <Head>
        <title>OOMA | Nigeria's Best-Rated Will Specialist</title>
        <meta name="description" content="A tamper-proof, accessible, and cost-friendly digital will system for Africa, built on the Sui Blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-50 min-h-screen font-sans">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-black-900 tracking-wider">OOMA</div>
            <div className="hidden md:flex items-center space-x-8 text-gray-700">
              <a href="#" className="hover:text-blue-900 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Criteria</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Requirements</a>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="bg-blue-900 text-white pt-24 pb-48">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                Where ancestral inheritance meets integrity
              </h1>
              <button className="mt-10 bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg flex items-center justify-center mx-auto transition-transform hover:scale-105 shadow-lg">
                Write my will
                <span className="ml-2 text-2xl font-light">→</span>
              </button>
            </div>
          </section>

          {/* Image Showcase Section */}
          <section className="container mx-auto px-6 -mt-36">
            <div className="relative h-64 md:h-96">
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1/3 h-4/5 bg-white shadow-xl rounded-3xl hidden md:block">
                     <Image src="/car.jpg" alt="Family car asset" layout="fill" objectFit="cover" className="rounded-3xl"/>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 h-full z-10">
                    <div className="relative w-full h-full shadow-2xl rounded-3xl overflow-hidden">
                        <Image src="/family.jpg" alt="Happy multi-generational family" layout="fill" objectFit="cover" />
                    </div>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-4/5 bg-gray-200 shadow-xl rounded-3xl hidden md:block"></div>
            </div>
          </section>

          {/* Specialist & Social Proof Section */}
          <section className="py-24 md:pt-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">The Nigeria's best-rated will specialist</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our specialist team has been placed first at the Good Funeral Awards, the British Wills & Probate Awards and more, and our customers have rated us Excellent on TrustPilot.
                  </p>
                </div>
                <div className="flex justify-center md:justify-end items-center space-x-8">
                    <Image src="/sui-foundation-logo.png" alt="Sui Foundation Logo" width={150} height={50} objectFit="contain" />
                    <Image src="/semicolon-logo.png" alt="Semicolon Logo" width={150} height={50} objectFit="contain" />
                </div>
              </div>
            </div>
          </section>
          
          {/* Service Cards Section */}
          <section className="pb-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                        <div className="flex justify-center items-center h-24 mb-4">
                            <Image src="/icon-wills.png" alt="Wills Icon" width={60} height={60} />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-6">Wills</h3>
                        <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">
                            Learn more
                        </a>
                    </div>
                    {/* Card 2 - Placeholder */}
                    <div className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                         <div className="flex justify-center items-center h-24 mb-4 bg-gray-100 rounded-md animate-pulse"></div>
                        <h3 className="text-xl font-bold text-blue-900 mb-6">Digital Assets</h3>
                        <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">
                            Learn more
                        </a>
                    </div>
                    {/* Card 3 - Placeholder */}
                    <div className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                        <div className="flex justify-center items-center h-24 mb-4 bg-gray-100 rounded-md animate-pulse"></div>
                        <h3 className="text-xl font-bold text-blue-900 mb-6">Probate</h3>
                        <a href="#" className="w-full inline-block bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
          </section>

          {/* Phone Call Section */}
          <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">We're only a phone call away</h2>
                        <p className="text-gray-600 mb-8">Any questions? Our friendly specialists are here to help from 9am to 6pm, Monday to Friday.</p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <PhoneIcon />
                                <span className="text-lg font-bold text-gray-800">0235467853</span>
                            </div>
                            <div className="flex items-center">
                                <StatusIcon />
                                <span className="text-gray-600">Line open - give us a call</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center">
                        <Image src="/telephone-illustration.png" alt="Illustration of a friendly telephone" width={200} height={200} objectFit="contain"/>
                    </div>
                </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1 mb-8 md:mb-0">
                        <h3 className="text-2xl font-bold text-blue-900 tracking-wider mb-4">OOMA</h3>
                        <div className="space-y-3 flex flex-col">
                           <a href="#" className="hover:text-blue-900">About us</a>
                           <a href="#" className="hover:text-blue-900">Blog</a>
                           <a href="#" className="hover:text-blue-900">Careers</a>
                           <a href="#" className="hover:text-blue-900">Security</a>
                           <a href="#" className="hover:text-blue-900">What to do when one dies</a>
                        </div>
                    </div>
                    {/* Placeholder for more footer links if needed */}
                    <div className="hidden lg:block"></div>
                    <div className="hidden lg:block"></div>
                    <div className="hidden lg:block"></div>
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-start justify-start lg:justify-end">
                        <a href="#" className="w-full md:w-auto bg-blue-900 text-white font-bold py-3 px-8 rounded-lg text-center hover:bg-blue-800 transition-colors">
                            Get started
                        </a>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} OOMA TRUST. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
      </div>
    </>
  );
}