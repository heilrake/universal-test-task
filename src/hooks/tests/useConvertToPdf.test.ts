/* @jest-environment jsdom */

import axios from "axios";
import { renderHook, waitFor } from "@testing-library/react";
import { type ErrorType, useConvertToPdf } from "../useConvertToPdf";

jest.mock("axios");

const mockBlobData = new Blob(["mock data"], { type: "application/pdf" });
const mockApiUrl =
  "http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4";

describe("useConvertToPdf hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch pdf data successfully", async () => {
    const inputText = "Some input text";
    const responseData = { data: mockBlobData };
    jest.spyOn(axios, "post").mockResolvedValue(responseData);

    const { result } = renderHook(() => useConvertToPdf());

    await waitFor(() => {
      result.current.fetchPdfData(inputText);
    });

    expect(result.current.pdfData).toEqual(mockBlobData);
    expect(result.current.loadingPdfData).toBe(false);
    expect(result.current.error).toBe(null);

    expect(axios.post).toHaveBeenCalledWith(
      mockApiUrl,
      { text: inputText },
      { responseType: "blob" },
    );
  });

  it("should handle error when fetching pdf data", async () => {
    const inputText = "Some input text";
    const errorMessage = "Error occurred";
    const errorStatus = 500;
    const error: ErrorType = { message: errorMessage, status: errorStatus };
    jest.spyOn(axios, "post").mockRejectedValueOnce(error);

    const { result } = renderHook(() => useConvertToPdf());

    await waitFor(() => {
      result.current.fetchPdfData(inputText);
    });

    expect(result.current.pdfData).toBe(null);
    expect(result.current.loadingPdfData).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(axios.post).toHaveBeenCalledWith(
      mockApiUrl,
      { text: inputText },
      { responseType: "blob" },
    );
  });
});
