import { useState, useEffect } from "react";

type useConversionHistoryType = {
  conversionHistory: string[];
  saveConversionToHistory: (blobDataUrl: string) => void;
};

export const useConversionHistory = (): useConversionHistoryType => {
  const [conversionHistory, setConversionHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setConversionHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveConversionToHistory = (blobDataUrl: string) => {
    const updatedHistory = [...conversionHistory, blobDataUrl];
    localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
    setConversionHistory(updatedHistory);
  };

  return { conversionHistory, saveConversionToHistory };
};
