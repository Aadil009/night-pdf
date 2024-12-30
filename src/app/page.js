'use client'
import React, { useState } from 'react';
import PDFViewer from '@/app/components/PDFViewer'
import FileUpload from '@/app/components/FileUpload'
import ThemeToggle from '@/app/components/ThemeToggle'
import { Github } from 'lucide-react';
const themeColors = {
  light: {
    background: 'bg-gray-100',
    navBackground: 'bg-white',
    text: 'text-gray-900',
    buttonBackground: 'bg-blue-600',
    buttonText: 'text-white',
  },
  dark: {
    background: 'bg-gradient-to-b from-[#121212] to-[#1E1E1E]',
    navBackground: 'bg-gradient-to-r from-[#000] to-[#292929]',
    text: 'text-gray-50',
    buttonBackground: 'bg-gradient-to-r from-[#3A86FF] to-[#5B9DFF]',
    buttonText: 'text-[#F4F4F4]',
  },
};

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null)
  const [fileName, setFileName] = useState('');
  const darkMode = true
  const colors = darkMode ? themeColors.dark : themeColors.light

  const handleFileSelect = (file) => {
    setPdfFile(file)
    setFileName(file.name)
  }
  const handleClear = () => {
    setPdfFile(null)
    setFileName('')
  }
  return (
    <div className={`min-h-screen ${colors.background}`}>
      <nav className={`${colors.navBackground} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/images/NightPdf.png" alt="Logo" className="h-20 w-auto" />
              <h1 className={`custom-font text-2xl font-bold ${colors.text}`}>NightPDF.com</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* {pdfFile && (
                <button
                  onClick={handleClear}
                  className="px-3 py-1 custom-font-description text-red-600 bg-red-50 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear PDF
                </button>
              )} */}
              <a href="https://github.com/Aadil009/night-pdf" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!pdfFile ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh] ${colors.navBackground} rounded-lg shadow-sm p-8`}>
            <h2 className={`custom-font text-3xl font-bold ${colors.text} mb-4`}>
              Transform Your PDFs for Night Reading
            </h2>
            <p className="custom-font-description text-gray-50 mb-8 text-center max-w-2xl">
              Upload your PDF to automatically convert it to a dark theme version.
              Perfect for comfortable reading in low-light conditions.
            </p>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className={`${colors.navBackground} rounded-lg shadow-sm p-4`}>
            <PDFViewer
              file={pdfFile}
              fileName={fileName}
              handleClear={handleClear}
            />
          </div>
        )}
      </main>
    </div>
  )
}
