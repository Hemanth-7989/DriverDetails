import React from "react";

function UploadedTable({
  documents,
  formatFileSize,
  formatDate,
  handleViewDocument,
  handleDeleteDocument,
}) {
  return (
    <div className="flex flex-col items-center">
      <table className="border-1 w-[90%] rounded-t-xs border-white border-separate">
        <thead className="bg-[#364261] text-white text-sm font-normal">
          <tr>
            <th className="p-2 rounded-tl-xl">File Name</th>
            <th>File Size</th>
            <th>Date</th>
            <th className="p-2 rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No documents uploaded yet
              </td>
            </tr>
          ) : (
            documents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-200">
                <td className="p-2 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      doc.type === "pdf" ? "bg-red-100" : "bg-blue-100"
                    }`}
                  >
                    {doc.type === "pdf" ? (
                      <i className="bi bi-filetype-pdf text-red-600 text-sm"></i>
                    ) : (
                      <i className="bi bi-file-earmark-image text-blue-600 text-sm"></i>
                    )}
                  </div>
                  <span className="text-sm">{doc.name}</span>
                </td>
                <td className="p-2 text-sm">{formatFileSize(doc.size)}</td>
                <td className="p-2 text-sm">{formatDate(doc.uploadDate)}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="View Document"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete document"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UploadedTable;
