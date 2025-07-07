import { useState, useRef } from "react";

const UploadDocumentDialog = ({ openUpload, setOpenUpload, onUpload }) => {
  const [dragActive, setDragActive] = useState(false); // Highlights drag area when dragging
  const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded file info
  const fileInputRef = useRef(null); // To trigger the hidden file input

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file, index) => {
      // Create a URL for file preview
      const fileUrl = URL.createObjectURL(file);

      return {
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: file.type.includes("pdf")
          ? "pdf"
          : file.type.includes("image")
          ? "image"
          : "document",
        uploadDate: Date.now(),
        fileUrl: fileUrl, // Add file URL for preview
        originalFile: file, // Keep reference to original file
      };
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    // Clean up the object URL to prevent memory leaks
    const fileToRemove = uploadedFiles.find((file) => file.id === fileId);
    if (fileToRemove && fileToRemove.fileUrl) {
      URL.revokeObjectURL(fileToRemove.fileUrl);
    }
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      // Pass the files to the parent component
      onUpload(uploadedFiles);
      // Clear the local state
      setUploadedFiles([]);
      // Close the dialog
      setOpenUpload(false);
    }
  };

  const handleCancel = () => {
    // Clean up object URLs to prevent memory leaks
    uploadedFiles.forEach((file) => {
      if (file.fileUrl) {
        URL.revokeObjectURL(file.fileUrl);
      }
    });
    setUploadedFiles([]);
    setOpenUpload(false);
  };

  if (!openUpload) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-0 m-0 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <p className="text-3xl font-medium text-gray-900">Upload Document</p>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-red-600 p-1  font-bold"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-8">
            If you have an inquiry or need to send the files directly, you may
            email us at{" "}
            <a
              href="mailto:support@ekamobility.com"
              className="text-blue-600 hover:underline"
            >
              support@ekamobility.com
            </a>
            .
          </p>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-2 m-0  text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-100"
                : "border-blue-300 bg-blue-50 hover:border-blue-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.svg"
              className="absolute inset-0 w-full h-[90%] opacity-0 cursor-pointer"
            />

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-4">
                <i className="bi bi-images text-[#0162E8] text-5xl"></i>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drag and Drop Files here or
              </h3>

              <button
                onClick={onButtonClick}
                className="bg-white border border-blue-300 text-blue-600 px-6 py-2 font-medium"
                style={{ borderRadius: "6px" }}
              >
                Browse Files
              </button>

              <p className="text-sm text-gray-500 mt-4">
                (Max. File size: 25 MB)
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-1">
            Only support .jpg, .png and .svg and .pdf files
          </p>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-1 space-y-3 max-h-20 overflow-auto">
              <h4 className="text-sm font-medium text-gray-900">
                Files to upload:
              </h4>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-50 rounded-lg p-2 flex items-center justify-between h-16"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded flex items-center justify-center ${
                        file.type === "pdf" ? "bg-red-100" : "bg-blue-100"
                      }`}
                    >
                      {file.type === "pdf" ? (
                        <i className="bi bi-filetype-pdf w-5 h-5 text-red-600 text-center"></i>
                      ) : (
                        <i className="bi bi-file-earmark-image w-5 h-5 text-blue-600 text-center"></i>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-blue-300 "
            style={{ borderRadius: "10px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ borderRadius: "10px" }}
          >
            <i className="bi bi-upload"></i>
            Upload ({uploadedFiles.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentDialog;
