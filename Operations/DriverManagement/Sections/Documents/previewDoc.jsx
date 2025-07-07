import React from "react";

function previewDoc({ previewFile , formatFileSize, closePreview}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded flex items-center justify-center ${
                previewFile.type === "pdf" ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              {previewFile.type === "pdf" ? (
                <i className="bi bi-filetype-pdf text-red-600"></i>
              ) : (
                <i className="bi bi-file-earmark-image text-blue-600"></i>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {previewFile.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(previewFile.size)}
              </p>
            </div>
          </div>
          <button
            onClick={closePreview}
            className="text-gray-400 hover:text-red-600 p-2"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
          {previewFile.type === "pdf" ? (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <i className="bi bi-filetype-pdf text-red-500 text-6xl mb-4"></i>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  PDF Document
                </h4>
                <p className="text-gray-600 mb-4">
                  PDF preview is not available in this environment.
                </p>
                <button
                  onClick={() => {
                    if (previewFile.fileUrl) {
                      window.open(previewFile.fileUrl, "_blank");
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <i className="bi bi-download mr-2"></i>
                  Download to View
                </button>
              </div>
            </div>
          ) : previewFile.type === "image" ? (
            <div className="text-center">
              {previewFile.fileUrl ? (
                <img
                  src={previewFile.fileUrl}
                  alt={previewFile.name}
                  className="max-w-full max-h-[60vh] mx-auto rounded-lg shadow-md"
                />
              ) : (
                <div className="bg-gray-100 rounded-lg p-8">
                  <i className="bi bi-file-earmark-image text-blue-500 text-6xl mb-4"></i>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Image File
                  </h4>
                  <p className="text-gray-600">
                    Image preview will be available after upload processing.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8">
                <i className="bi bi-file-earmark text-gray-500 text-6xl mb-4"></i>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Document File
                </h4>
                <p className="text-gray-600 mb-4">
                  Preview not available for this file type.
                </p>
                <button
                  onClick={() => {
                    if (previewFile.fileUrl) {
                      window.open(previewFile.fileUrl, "_blank");
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <i className="bi bi-download mr-2"></i>
                  Download File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default previewDoc;
