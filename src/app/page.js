'use client'
import React, { useState } from 'react';
import PDFViewer from '@/app/components/PDFViewer'
import FileUpload from '@/app/components/FileUpload'
import ThemeToggle from '@/app/components/ThemeToggle'
import { Github } from 'lucide-react';
export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    setPdfFile(file)
    setFileName(file.name)
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
            <img src="/images/NightPdf.png" alt="Logo" className="h-20 w-auto" />
              {/* <h1 className="custom-font text-2xl font-bold text-gray-900 dark:text-white">NightPDF.com</h1> */}
            </div>
            {/* <div className="flex items-center space-x-4">
              <a href="https://github.com/Aadil009" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Github className="h-6 w-6" />
              </a>
            </div> */}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!pdfFile ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className=" custom-font text-3xl font-bold text-gray-900 dark:text-white mb-4">Transform Your PDFs for Night Reading</h2>
            <p className="custom-font-description text-white dark:text-white mb-8 text-center max-w-2xl">
            Upload your PDF to automatically convert it to a dark theme version.
              Perfect for comfortable reading in low-light conditions.
            </p>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <PDFViewer
              file={pdfFile}
              fileName={fileName}
            />
          </div>
        )}
      </main>
      {/* <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2024 NightPDF
          </p>
        </div>
      </footer> */}
    </div>
  )
}
