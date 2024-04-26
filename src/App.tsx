// Core
import { useState, useEffect } from "react";

// Components
import { PdfViewer } from "./components/PdfViewer";
import { HistoryList } from "./components/HistoryList";

// Hooks
import { useConversionHistory } from "./hooks/useConversionHistory";
import { useConvertToPdf } from "./hooks/useConvertToPdf";

// Utils
import { convertBlobToDataUrl } from "./utils/convertBlobToUrl";
import "./App.css";

export const App = () => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedPdf, setSelectedPdf] = useState<string>("");
  const { conversionHistory, saveConversionToHistory } = useConversionHistory();
  const { pdfData, fetchPdfData, loadingPdfData } = useConvertToPdf();

  const saveBlobToLocalStorage = async (blob: Blob) => {
    const blobDataUrl = await convertBlobToDataUrl(blob);
    saveConversionToHistory(blobDataUrl);
  };

  const handleConvert = () => {
    fetchPdfData(inputText);
  };

  const handlePdfSelection = (url: string) => {
    setSelectedPdf(url);
  };

  useEffect(() => {
    if (pdfData) {
      saveBlobToLocalStorage(pdfData);
    }
  }, [pdfData]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5 flex  flex-col">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Converter to PDF</h1>
          <div className="flex flex-col justify-center items-center mb-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text..."
              className="resize rounded-md mb-6 p-2 min-h-10 min-w-96 max-w-xl max-h-96"
            />
            <button
              onClick={handleConvert}
              disabled={loadingPdfData}
              className=" w-64 rounded-lg border border-transparent py-3 px-6 text-base font-semibold
               bg-gray-900 cursor-pointer transition duration-250 ease-in-out transform
               hover:border-indigo-600 focus:border-indigo-600 focus:outline-none focus-visible:ring-4
               focus-visible:ring-indigo-600 focus-visible:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed
               disabled:hover:border-transparent disabled:hover:shadow-none"
            >
              Convert to PDF
            </button>
          </div>
          {selectedPdf && <PdfViewer selectedPdf={selectedPdf} />}
        </div>
      </div>
      {conversionHistory.length !== 0 && (
        <div className="w-1/5">
          <HistoryList
            conversionHistory={conversionHistory}
            handlePdfSelection={handlePdfSelection}
          />
        </div>
      )}
    </div>
  );
};
