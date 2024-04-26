import axios from "axios";
import { useCallback, useState } from "react";

export type ErrorType = {
  message: string;
  status: number;
};

type useConvertToPdfType = {
  pdfData: Blob | null;
  loadingPdfData: boolean;
  error: ErrorType | null;
  fetchPdfData: (inputText: string) => void;
};

export const useConvertToPdf = (): useConvertToPdfType => {
  const [pdfData, setPdfData] = useState<Blob | null>(null);
  const [loadingPdfData, setLoadingPdfData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchPdfData = useCallback((inputText: string) => {
    void (async () => {
      try {
        setLoadingPdfData(true);

        const response = await axios.post<Blob>(
          "http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4",
          {
            text: inputText,
          },
          {
            responseType: "blob",
          },
        );

        setPdfData(response.data);
      } catch (error: ErrorType | any) {
        setError(error);
      } finally {
        setLoadingPdfData(false);
      }
    })();
  }, []);

  return { pdfData, loadingPdfData, error, fetchPdfData };
};
