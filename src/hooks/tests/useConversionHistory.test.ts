/* @jest-environment jsdom */

import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import { useConversionHistory } from "../useConversionHistory";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

const mockBlobDataUrl =
  "data:application/pdf;base64,JVBERi0xLjMKJf////8KNyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA1IDAgUgovUmVzb3VyY2VzIDYgMCBSCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgOCAwIFIKPj4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA4MAovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJwzVDAAQl1DIGFuaaSQnMtVyGWIIeYUAhU0VDA3UjA3NNQztjBRCMnl0nczVDA0UghJ44q2MTM0NzYzgZB2CgaxCiFeXK4hXIFcAMXpE7kKZW5kc3RyZWFtCmVuZG9iagoxMCAwIG9iagooUERGS2l0KQplbmRvYmoKMTEgMCBvYmoKKFBERktpdCkKZW5kb2JqCjEyIDAgb2JqCihEOjIwMjQwNDI2MTYzNjQwWikKZW5kb2JqCjkgMCBvYmoKPDwKL1Byb2R1Y2VyIDEwIDAgUgovQ3JlYXRvciAxMSAwIFIKL0NyZWF0aW9uRGF0ZSAxMiAwIFIKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iago0IDAgb2JqCjw8Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAxIDAgUgovTmFtZXMgMiAwIFIKPj4KZW5kb2JqCjEgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFs3IDAgUl0KPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Rlc3RzIDw8CiAgL05hbWVzIFsKXQo+Pgo+PgplbmRvYmoKeHJlZgowIDEzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDcwMCAwMDAwMCBuIAowMDAwMDAwNzU3IDAwMDAwIG4gCjAwMDAwMDA2MzggMDAwMDAgbiAKMDAwMDAwMDYxNyAwMDAwMCBuIAowMDAwMDAwMjA4IDAwMDAwIG4gCjAwMDAwMDAxMTkgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwNTIwIDAwMDAwIG4gCjAwMDAwMDA0NDUgMDAwMDAgbiAKMDAwMDAwMDM1OSAwMDAwMCBuIAowMDAwMDAwMzg0IDAwMDAwIG4gCjAwMDAwMDA0MDkgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAxMwovUm9vdCAzIDAgUgovSW5mbyA5IDAgUgovSUQgWzxkNjRhMjFkZjI4YTc4ZTdjODA2NmFkNjU1MzMyZDU0MT4gPGQ2NGEyMWRmMjhhNzhlN2M4MDY2YWQ2NTUzMzJkNTQxPl0KPj4Kc3RhcnR4cmVmCjgwNAolJUVPRgo=";

describe("useConversionHistory hook", () => {
  it("should save conversion to history into state", () => {
    const result = renderHook(() => useConversionHistory());
    expect(result.result.current.conversionHistory).toStrictEqual([]);

    act(() => {
      result.result.current.saveConversionToHistory(mockBlobDataUrl);
    });

    expect(result.result.current.conversionHistory).toStrictEqual([mockBlobDataUrl]);
  });

  it("should save conversion to history into localStorage", () => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    const result = renderHook(() => useConversionHistory());
    act(() => {
      result.result.current.saveConversionToHistory(mockBlobDataUrl);
    });

    const storedHistory = JSON.parse(localStorageMock.getItem("conversionHistory"));
    expect(storedHistory).toEqual([mockBlobDataUrl]);
  });
});
