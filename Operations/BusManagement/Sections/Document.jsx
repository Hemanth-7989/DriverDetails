 import React, { useState, useRef } from "react";
import "./Document.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const UploadDocumentDialog = ({ openUpload, setOpenUpload, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  /* -----------------------------  Helpers  ----------------------------- */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  /* --------------------------  Drag ‑ n ‑ Drop  ------------------------- */
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
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  /* ----------------------------  File Input  --------------------------- */
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, idx) => {
      const url = URL.createObjectURL(file);
      return {
        id: Date.now() + idx,
        name: file.name,
        size: file.size,
        type: file.type.includes("pdf")
          ? "pdf"
          : file.type.includes("image")
          ? "image"
          : "document",
        uploadDate: Date.now(),
        fileUrl: url,
        originalFile: file,
      };
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    const file = uploadedFiles.find((f) => f.id === fileId);
    if (file) URL.revokeObjectURL(file.fileUrl);
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  /* --------------------------  CTA Handlers  --------------------------- */
  const handleUpload = () => {
    if (uploadedFiles.length) {
      onUpload(uploadedFiles);
      setUploadedFiles([]);
      setOpenUpload(false);
    }
  };

  const handleCancel = () => {
    uploadedFiles.forEach((f) => URL.revokeObjectURL(f.fileUrl));
    setUploadedFiles([]);
    setOpenUpload(false);
  };

  /* ------------------------------  UI  --------------------------------- */
  if (!openUpload) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[95vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-xl font-semibold">Upload Document</h2>
          <button
            className="text-gray-400 hover:text-red-600"
            onClick={handleCancel}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-6 overflow-y-auto">
          <p className="text-sm text-gray-500">
            Need help? Email us at
            <a href="mailto:support@ekamobility.com" className="text-blue-600 ml-1 hover:underline">
              support@ekamobility.com
            </a>
          </p>

          {/* Drag‑and‑Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-100" : "border-blue-300 bg-blue-50 hover:border-blue-400"
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
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.svg"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <i className="bi bi-images text-5xl text-blue-600 mb-4"></i>
            <h3 className="text-lg font-medium">Drag & Drop files here or</h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 border border-blue-300 text-blue-600 px-4 py-2 rounded"
            >
              Browse Files
            </button>
            <p className="text-sm text-gray-500 mt-4">Max file size: 25MB • Supports JPG, PNG, SVG, PDF</p>
          </div>

          {/* File Preview List */}
          {uploadedFiles.length > 0 && (
            <div className="max-h-40 overflow-auto space-y-2 mt-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded ${
                        file.type === "pdf" ? "bg-red-100" : "bg-blue-100"
                      }`}
                    >
                      {file.type === "pdf" ? (
                        <i className="bi bi-filetype-pdf text-red-600"></i>
                      ) : (
                        <i className="bi bi-file-earmark-image text-blue-600"></i>
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium truncate max-w-[10rem]">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500" onClick={() => removeFile(file.id)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm border border-blue-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
            className="px-4 py-2 text-sm text-white rounded flex items-center gap-2 disabled:bg-gray-400 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            <i className="bi bi-upload"></i>
            Upload ({uploadedFiles.length})
          </button>
        </div>
      </div>
    </div>
  );
};

/*****************************************************************************************
 * Document Component                                                                     *
 * -------------------------------------------------------------------------------------- *
 * Integrates the dialog above with a simple table‑style document viewer.                  *
 *****************************************************************************************/
const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [viewDoc, setViewDoc] = useState(null);
  const [openUpload, setOpenUpload] = useState(false);

  /* ---------------------------  Helpers  --------------------------- */
  const addUploadedFiles = (files) => {
    // Map dialog files to list format used in table
    const mapped = files.map((f) => ({
      id: f.id,
      name: f.name,
      size: (f.size / 1024).toFixed(2) + " KB",
      date: new Date(f.uploadDate).toLocaleDateString(),
      fileUrl: f.fileUrl,
    }));
    setDocuments((prev) => [...prev, ...mapped]);
  };

  const handleDelete = (id) => {
    const doc = documents.find((d) => d.id === id);
    if (doc?.fileUrl) URL.revokeObjectURL(doc.fileUrl);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setViewDoc(null);
  };

  /* ------------------------------  UI  ----------------------------- */
  return (
    <div className="document-left-container">
      {/* Top bar */}
      <div className="upload-section d-flex align-items-center justify-content-between mb-2">
        <div className="supporting-documents d-flex align-items-center gap-2">
          <i className="bi bi-folder2-open text-primary"></i>
          <span>Supporting Documents</span>
        </div>
        <button
          className="upload-btn-primary d-flex align-items-center gap-2"
          onClick={() => setOpenUpload(true)}
        >
          <i className="bi bi-upload"></i>
          Upload Document
        </button>
      </div>

      {/* Table header */}
      <div className="document-table">
        <div className="table-header">
          <div>File Name</div>
          <div>File Size</div>
          <div>Date</div>
          <div>Action</div>
        </div>

        {/* Table rows */}
        {documents.map((doc) => (
          <div className="table-row" key={doc.id}>
            <div className="truncate">
              <i className="bi bi-file-earmark-text me-2"></i>
              {doc.name}
            </div>
            <div>
              <i className="bi bi-hdd me-2 text-secondary"></i>
              {doc.size}
            </div>
            <div>
              <i className="bi bi-calendar-event me-2 text-secondary"></i>
              {doc.date}
            </div>
            <div className="action-icons d-flex gap-2">
              <i
                className="bi bi-eye text-primary cursor-pointer"
                title="View"
                onClick={() => setViewDoc(doc)}
              ></i>
              <i
                className="bi bi-trash text-danger cursor-pointer"
                title="Delete"
                onClick={() =>
                  window.confirm("Delete this file?") && handleDelete(doc.id)
                }
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Detail view */}
      {viewDoc && (
        <div className="view-section mt-3 p-3 border rounded bg-light position-relative animate-fade-in">
          <button
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={() => setViewDoc(null)}
          ></button>
          <h6 className="mb-3">Document Details</h6>
          <p>
            <strong>File Name:</strong> {viewDoc.name}
          </p>
          <p>
            <strong>File Size:</strong> {viewDoc.size}
          </p>
          <p>
            <strong>Date:</strong> {viewDoc.date}
          </p>
        </div>
      )}

      {/* Upload Modal */}
      <UploadDocumentDialog
        openUpload={openUpload}
        setOpenUpload={setOpenUpload}
        onUpload={addUploadedFiles}
      />
    </div>
  );
};

export default Document;
