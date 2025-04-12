'use client';

import { Eye, Download } from 'lucide-react';
import Image from 'next/image';

const studyMaterials = [
  {
    title: '10 UX laws',
    author: 'Sofia Tim',
    pdfUrl: '/pdfs/10-ux-laws.pdf',
    imageUrl: '/pdf file.png', 
  },
  {
    title: '10 UX laws',
    author: 'Sofia Tim',
    pdfUrl: '/pdfs/10-ux-laws.pdf',
    imageUrl: '/pdf file.png', 
  },
  {
    title: '10 UX laws',
    author: 'Sofia Tim',
    pdfUrl: '/pdfs/10-ux-laws.pdf',
    imageUrl: '/pdf file.png', 
  },
  {
    title: '10 UX laws',
    author: 'Sofia Tim',
    pdfUrl: '/pdfs/10-ux-laws.pdf',
    imageUrl: '/pdf file.png', 
  },
  {
    title: '10 UX laws',
    author: 'Sofia Tim',
    pdfUrl: '/pdfs/10-ux-laws.pdf',
    imageUrl: '/pdf file.png', 
  },
];

export default function StudyMaterialTab() {
  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">PDF</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {studyMaterials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={item.imageUrl}
                alt="PDF Icon"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <h3 className="text-center text-lg font-semibold">{item.title}</h3>
            <p className="text-center text-gray-500 text-sm mb-4">By {item.author}</p>

            <div className="flex justify-between mt-4">
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-50 p-2 rounded-full text-green-800 hover:bg-green-100"
              >
                <Eye size={20} />
              </a>
              <a
                href={item.pdfUrl}
                download
                className="bg-green-50 p-2 rounded-full text-green-800 hover:bg-green-100"
              >
                <Download size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
