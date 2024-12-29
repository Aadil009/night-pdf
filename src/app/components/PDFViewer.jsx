'use client'
import React, { useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

export default function PDFViewer({ file, fileName }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRefs = useRef([])
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    canvasRefs.current = Array(numPages).fill(null).map(() => React.createRef());
  }
  const darkModeStyles = {
    filter: 'invert(1) hue-rotate(180deg)',
    background: '#ffffff'
  }
  const downloadDarkPDF = async () => {
    try {
      setIsGenerating(true)
      const { jsPDF } = await import('jspdf')
      const html2canvas = await import('html2canvas')
      const pdf = new jsPDF()
      pdf.setFont('helvetica')
      pdf.setFontSize(10)
      pdf.setTextColor(150)
      pdf.text('Created with NightPDF', 10, 10)
      const pageToCanvas = async (pageNumber) => {
        const pageElement = document.querySelector(`#page-${pageNumber}`)
        if (!pageElement) return null
        const canvas = await html2canvas.default(pageElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        })
        return canvas
      }
      for (let i = 1; i <= numPages; i++) {
        const canvas = await pageToCanvas(i)
        if (canvas) {
          if (i > 1) {
            pdf.addPage()
            pdf.setFont('helvetica')
            pdf.setFontSize(10)
            pdf.setTextColor(150)
            pdf.text('Created with NightPDF', 10, 10)
          }
          const imgData = canvas.toDataURL('image/jpeg', 1.0)
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = pdf.internal.pageSize.getHeight()
          pdf.addImage(imgData, 'JPEG', 0, 15, pdfWidth, pdfHeight - 15, undefined, 'FAST')
        }
      }
      pdf.save(`NightPDF-${fileName || 'converted'}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('There was an error generating the PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }
  return (
    <div className="pdf-viewer">
      <div className="controls mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-wrap items-center justify-between gap-4">
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
            onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
            className="p-2 rounded-lg bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Page {pageNumber} of {numPages}</span>
          {/* <button
            onClick={downloadDarkPDF}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >{isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (<>
            <Download className="w-4 h-4" />
            <span>Download Dark PDF</span>
          </>
          )}
          </button> */}
        </div>
      </div>
      <div className="pdf-container bg-white dark:bg-gray-800 rounded-lg p-4" style={darkModeStyles}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        ><Page
            id={`page-${pageNumber}`}
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-lg"
          /></Document>
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
