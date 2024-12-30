'use client'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

export default function PDFViewer({ file, fileName, handleClear }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pageWidth, setPageWidth] = useState(null)
  const handleDoubleTap = () => {
    setScale(prev => Math.min(3, prev + 0.1))
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const onPageLoadSuccess = ({ width }) => {
    setPageWidth(width)
  }
  return (
    <div className="pdf-viewer w-full h-full flex flex-col">
      <div className="controls mb-4 p-4 bg-gray-100 dark:bg-gradient-to-r from-[#000] to-[#000] rounded-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
            className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="px-2">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(prev => Math.min(3, prev + 0.1))}
            className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleClear}
          className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
        >
          Clear PDF
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm">Page {pageNumber} of {numPages}</span>
        </div>
      </div>

      <div
        className="pdf-container flex-1 bg-white dark:bg-gradient-to-r from-[#000] to-[#292929] rounded-lg p-4 mt-4 overflow-hidden"
        style={{
          width: '100%',
          height: 'calc(100vh - 200px)'
        }}
        onDoubleClick={handleDoubleTap}
      >
        <div className="h-full w-full overflow-auto dark:invert dark:hue-rotate-180">
          <div className="min-w-fit flex justify-center">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
            >
              <div className="relative">
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                />
              </div>
            </Document>
          </div>
        </div>
      </div>

      <div className="pagination mt-4 flex justify-center gap-2">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
          className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
          className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}