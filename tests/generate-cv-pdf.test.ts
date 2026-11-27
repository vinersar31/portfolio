// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { describe, it, expect } from "vitest";
import { cvData } from "../src/data/cv";
import { pdfSummary, renderCvPdf } from "../scripts/generate-cv-pdf";

describe("pdfSummary", () => {
  it("drops the website intro sentence", () => {
    expect(pdfSummary("here you'll find a snapshot. Senior engineer.")).toBe("Senior engineer.");
  });

  it("keeps a summary without the intro unchanged", () => {
    expect(pdfSummary("Senior engineer. Loves C++.")).toBe("Senior engineer. Loves C++.");
  });
});

describe("renderCvPdf", () => {
  it("writes a one-page PDF that contains every company from the CV data", async () => {
    const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "cv-")), "cv.pdf");
    await renderCvPdf(cvData, out);
    const raw = fs.readFileSync(out);
    expect(raw.subarray(0, 5).toString()).toBe("%PDF-");
    expect(raw.toString("latin1").match(/\/Type \/Page\b/g)).toHaveLength(1);

    // Inflate content streams and collect the hex-encoded text pdfkit emits.
    const latin = raw.toString("latin1");
    let text = "";
    for (const m of latin.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)) {
      try {
        const content = zlib.inflateSync(Buffer.from(m[1], "latin1")).toString("latin1");
        for (const hex of content.matchAll(/<([0-9a-fA-F]+)>/g)) {
          text += Buffer.from(hex[1], "hex").toString("latin1");
        }
      } catch {
        // not a deflated stream
      }
    }
    expect(text).toContain("Aurora");
    for (const exp of cvData.experience) {
      expect(text).toContain(exp.company);
    }
  });
});
