// src/components/ImageModal.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity"
        onClick={onClose}
    >
      <div 
        className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] bg-white rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image 
            src={src} 
            alt={alt} 
            width={1200} 
            height={800} 
            className="rounded-md object-contain max-h-[85vh]"
            priority
        />
        <button 
            onClick={onClose} 
            className="absolute -top-4 -right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-600 transition-colors"
            aria-label="Close image viewer"
        >
            <CloseIcon />
        </button>
      </div>
    </div>
  );
}