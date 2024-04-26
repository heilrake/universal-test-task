export const HistoryList = ({
  conversionHistory,
  handlePdfSelection,
}: {
  conversionHistory: string[];
  handlePdfSelection: (url: string) => void;
}) => {
  return (
    <div className="mt-4 ">
      <h2 className="text-xl font-semibold mb-2 ">History of conversions</h2>
      <ul>
        {conversionHistory.map((url, index) => (
          <li key={index} className="mb-4">
            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 
              focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
              px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handlePdfSelection(url)}
            >
              Document {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
