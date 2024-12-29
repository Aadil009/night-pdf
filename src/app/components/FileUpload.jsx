import { Upload } from 'lucide-react';

export default function FileUpload({ onFileSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      onFileSelect(file)
    } else {
      alert('Please upload a valid PDF file')
    }
  }
  return (
    <div className="w-full max-w-md">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10MB)</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept=".pdf" 
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}