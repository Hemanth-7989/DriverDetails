import { useState } from "react";
import UploadDocumentDialog from "./DocumentUploader";
// eslint-disable-next-line no-unused-vars
import previewDoc from "./previewDoc.jsx";
import UploadedTable from "./UploadedTable.jsx";

function Documents() {
  const [isOpen, setIsOpen] = useState(false); // Controls dialog visibility
  const [documents, setDocuments] = useState([]); // Stores all uploaded documents
  const [previewFile, setPreviewFile] = useState(null);

  const handleDocumentsUpload = (newFiles) => {
    setDocuments((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteDocument = (fileId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== fileId));
  };

  const handleViewDocument = (document) => {
    if (document.fileUrl && document.originalFile) {
      if (document.type === "pdf") {
        // Create a new blob URL specifically for PDF viewing
        const blob = new Blob([document.originalFile], {
          type: "application/pdf",
        });
        const pdfUrl = URL.createObjectURL(blob);

        // Open PDF in new tab
        const newWindow = window.open(pdfUrl, "_blank");

        // Clean up the URL after a delay to prevent memory leaks
        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl);
        }, 1000);

        // If window.open was blocked, try a different approach
        if (!newWindow) {
          // Create a temporary link and click it
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.target = "_blank";
          link.click();
          URL.revokeObjectURL(pdfUrl);
        }
      } else {
        // Open other files (images, etc.) in new tab
        window.open(document.fileUrl, "_blank");
      }
    } else {
      // Fallback to modal preview if no fileUrl
      setPreviewFile(document);
    }
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <>
      <div className="flex w-full h-10 gap-5 pr-2.5 items-center justify-between">
        <div className="flex gap-3 mx-3 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              opacity="0.991"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.4454 0C7.89116 0 12.3369 0 16.7826 0C17.0811 0.083959 17.281 0.279271 17.3823 0.585937C17.4063 1.10652 17.4143 1.62735 17.4063 2.14844C17.2464 2.00195 17.0865 1.85547 16.9266 1.70898C13.357 1.69287 9.79076 1.70915 6.22799 1.75781C5.77265 1.70127 5.30887 1.69313 4.8367 1.7334C4.50607 1.86147 4.29018 2.09748 4.18902 2.44141C4.16504 4.7851 4.15704 7.12886 4.16504 9.47265C3.76524 9.47265 3.36544 9.47265 2.96565 9.47265C2.95765 6.51035 2.96565 3.54813 2.98963 0.585937C3.0469 0.308569 3.19883 0.113256 3.4454 0Z"
              fill="#09BCFF"
            />
            <path
              opacity="0.989"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.7856 0C17.3454 0 17.9051 0 18.4648 0C18.6716 0.104819 18.8236 0.26758 18.9206 0.488281C18.9445 1.56238 18.9526 2.6366 18.9445 3.71094C18.4168 3.20638 17.9051 2.68555 17.4093 2.14844C17.4173 1.62735 17.4093 1.10652 17.3853 0.585937C17.2841 0.279271 17.0841 0.083959 16.7856 0Z"
              fill="#00AEEF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.23001 1.7573C5.90651 1.89955 5.69062 2.1437 5.58234 2.48972C5.55836 4.81714 5.55034 7.1446 5.55836 9.47214C5.09457 9.47214 4.63083 9.47214 4.16706 9.47214C4.15906 7.12834 4.16706 4.78458 4.19105 2.44089C4.29221 2.09696 4.5081 1.86096 4.83872 1.73289C5.3109 1.69262 5.77468 1.70076 6.23001 1.7573Z"
              fill="#00AEEF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.9297 1.70889C16.9216 2.88088 16.9297 4.05275 16.9536 5.22452C17.0679 5.58506 17.2998 5.83736 17.6493 5.98135C18.3048 6.00577 18.9604 6.01392 19.6163 6.00577C19.6163 7.99146 19.6163 9.9771 19.6163 11.9628C20.128 11.9628 20.6398 11.9628 21.1515 11.9628C19.1686 11.9954 17.1776 12.0116 15.1785 12.0116C13.1614 12.0114 11.1544 11.9788 9.15761 11.914C8.9847 11.5783 8.8248 11.2365 8.67785 10.8886C12.0522 10.8967 15.4264 10.8886 18.8007 10.8642C19.0273 10.7453 19.0993 10.5581 19.0166 10.3026C18.9584 10.227 18.8864 10.1701 18.8007 10.1317C15.2825 10.1073 11.7643 10.0992 8.24607 10.1073C8.14465 9.84942 7.96872 9.66226 7.71834 9.54581C7.22285 9.52139 6.72711 9.51329 6.23109 9.52139C5.13538 9.53755 4.04791 9.52125 2.96875 9.47256C3.36855 9.47256 3.76835 9.47256 4.16814 9.47256C4.63191 9.47256 5.09565 9.47256 5.55943 9.47256C5.55142 7.14503 5.55943 4.81756 5.58342 2.49014C5.6917 2.14412 5.90759 1.89998 6.23109 1.75772C9.79386 1.70905 13.3601 1.69278 16.9297 1.70889Z"
              fill="#E9F5FE"
            />
            <path
              opacity="0.996"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.9285 1.70898C17.0884 1.85547 17.2484 2.00195 17.4083 2.14844C17.904 2.68555 18.4158 3.20638 18.9435 3.71094C19.6791 4.47591 20.4148 5.24087 21.1504 6.00586C20.6386 6.00586 20.1269 6.00586 19.6152 6.00586C18.9593 6.01401 18.3037 6.00586 17.6482 5.98144C17.2987 5.83745 17.0668 5.58516 16.9525 5.22461C16.9285 4.05285 16.9205 2.88097 16.9285 1.70898Z"
              fill="#B2D9FD"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.6143 6.00586C20.126 6.00586 20.6377 6.00586 21.1495 6.00586C21.1974 7.98325 21.2134 9.9689 21.1975 11.9629C21.1815 11.9629 21.1655 11.9629 21.1495 11.9629C20.6377 11.9629 20.126 11.9629 19.6143 11.9629C19.6143 9.9772 19.6143 7.99155 19.6143 6.00586Z"
              fill="#D8ECFE"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.85957 7.61805C11.5058 7.60989 15.1519 7.61805 18.798 7.64246C19.047 7.7847 19.1029 7.98817 18.9659 8.25281C18.9299 8.28338 18.8899 8.30779 18.846 8.32606C15.1839 8.35862 11.5217 8.35862 7.85957 8.32606C7.68148 8.20335 7.62554 8.03245 7.69165 7.81336C7.75766 7.75452 7.8136 7.68944 7.85957 7.61805Z"
              fill="#82AEE3"
            />
            <path
              opacity="0.998"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.96677 9.47352C4.04592 9.5222 5.13339 9.53851 6.22911 9.52235C6.3181 9.58045 6.40604 9.64554 6.49297 9.71766C6.87793 10.4768 7.26975 11.2337 7.66838 11.9882C8.17399 12.024 8.66972 11.9996 9.15562 11.9149C11.1525 11.9798 13.1594 12.0123 15.1766 12.0126C17.1756 12.0126 19.1666 11.9963 21.1495 11.9638C21.1655 11.9638 21.1815 11.9638 21.1975 11.9638C21.6009 12.0841 21.8807 12.3445 22.0371 12.745C22.0691 16.5862 22.0691 20.4273 22.0371 24.2684C21.8833 24.6451 21.6194 24.8892 21.2455 25.0009C14.6728 25.0009 8.10016 25.0009 1.5275 25.0009C1.14864 24.8344 0.916758 24.5414 0.83185 24.122C0.799865 19.4507 0.799865 14.7795 0.83185 10.1083C0.900307 9.79456 1.08421 9.5911 1.38357 9.49793C1.91106 9.47352 2.43879 9.46536 2.96677 9.47352Z"
              fill="#0162E8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.23096 9.52233C6.72698 9.51422 7.22271 9.52233 7.7182 9.54674C7.96859 9.66319 8.14451 9.85035 8.24593 10.1083C8.3663 10.3862 8.51023 10.6466 8.67771 10.8895C8.82466 11.2375 8.98457 11.5793 9.15747 11.9149C8.67157 11.9996 8.17584 12.024 7.67023 11.9881C7.2716 11.2337 6.87978 10.4768 6.49482 9.71764C6.40789 9.64552 6.31995 9.58043 6.23096 9.52233Z"
              fill="#014DBC"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.24609 10.1083C11.7643 10.1001 15.2825 10.1083 18.8007 10.1327C18.8864 10.171 18.9584 10.228 19.0166 10.3036C19.0993 10.559 19.0274 10.7462 18.8007 10.8651C15.4265 10.8895 12.0522 10.8977 8.67787 10.8895C8.51039 10.6467 8.36646 10.3862 8.24609 10.1083Z"
              fill="#85B0E3"
            />
            <path
              opacity="0.996"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.1995 11.9638C21.7434 11.9556 22.2872 11.9638 22.8306 11.9882C23.2746 12.0982 23.5385 12.3831 23.6222 12.8427C23.6542 16.6024 23.6542 20.3622 23.6222 24.122C23.5373 24.5414 23.3054 24.8344 22.9266 25.0009C22.3669 25.0009 21.8072 25.0009 21.2474 25.0009C21.6214 24.8892 21.8852 24.6451 22.039 24.2684C22.071 20.4273 22.071 16.5862 22.039 12.745C21.8827 12.3445 21.6028 12.0841 21.1995 11.9638Z"
              fill="#014DBC"
            />
          </svg>
          <p>Supporting Documents</p>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white "
          style={{ borderRadius: "6px" }}
          onClick={() => setIsOpen(true)}
        >
          <i className="bi bi-download"></i> Upload Documents
        </button>
      </div>
      <hr />
      <div className="h-full">
        <UploadDocumentDialog
          openUpload={isOpen}
          setOpenUpload={setIsOpen}
          onUpload={handleDocumentsUpload}
        />
        <UploadedTable
          documents={documents}
          formatFileSize={formatFileSize}
          formatDate={formatDate}
          handleViewDocument={handleViewDocument}
          handleDeleteDocument={handleDeleteDocument}
        />
        {previewFile && (
          <previewDoc
            previewFile={previewFile}
            formatFileSize={formatFileSize}
            closePreview={closePreview}
          />
        )}
      </div>
    </>
  );
}

export default Documents;
