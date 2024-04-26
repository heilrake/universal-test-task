export const PdfViewer = ({ selectedPdf }: { selectedPdf: string }) => {
  return (
    <div className="mt-4 w-4/5">
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      <embed src={selectedPdf} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};
