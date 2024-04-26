/* @jest-environment jsdom */

import { convertBlobToDataUrl } from "./convertBlobToUrl";

describe("convertBlobToDataUrl", () => {
  it("should convert Blob to data URL", async () => {
    const mockBlob = new Blob(["mock data"], { type: "text/plain" });

    const dataUrl = await convertBlobToDataUrl(mockBlob);

    expect(dataUrl).toContain("data:text/plain;base64");
  });
});
