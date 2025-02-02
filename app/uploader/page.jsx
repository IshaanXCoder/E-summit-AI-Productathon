"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Upload, FileText } from "lucide-react"

const Page = () => {
  const [file, setFile] = useState(null)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "text/*": [".txt", ".json"] } })

  const handleSubmit = async () => {
    try {
      if (!file) {
        console.log("No file selected")
        return
      }

      // Read the file content
      const fileContent = await readFileAsText(file)
      console.log("File content:", fileContent)

      // Send the file content to the backend
      const res = await fetch("/api/readEval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: fileContent }),
      })

      const data = await res.json()
      const jsonData = JSON.parse(data.content.slice(7, -4))
      localStorage.setItem("projDetails", JSON.stringify(jsonData))
      router.push("/evalPage")
    } catch (err) {
      console.log(err)
    }
  }

  // Helper function to read file as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-lg p-8 border border-white border-opacity-20">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">File Upload</h1>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? "border-white" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="text-white">
                <FileText className="mx-auto mb-2" size={48} />
                <p>{file.name}</p>
              </div>
            ) : (
              <div className="text-white">
                <Upload className="mx-auto mb-2" size={48} />
                <p>Drag & drop a file here, or click to select a file</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!file}
            className="mt-6 w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page

