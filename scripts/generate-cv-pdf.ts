/**
 * Generates public/cv.pdf from the CV data in src/data/cv.ts.
 *
 * Runs automatically before `npm run dev` and `npm run build`, so the
 * downloadable PDF can never drift from the CV shown on the site.
 *
 * Usage: npx tsx scripts/generate-cv-pdf.ts [outputPath]
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { cvData, type CvData } from "../src/data/cv";

const COLORS = {
  text: "#1f2328",
  muted: "#59636e",
  accent: "#c2283c",
  rule: "#d0d7de",
};

const FONT = {
  regular: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
};

const MARGIN = 42;

/** The site summary opens with page copy ("here you'll find..."); keep only the professional part. */
export function pdfSummary(summary: string): string {
  const trimmed = summary.trim();
  if (/^here you/i.test(trimmed)) {
    const idx = trimmed.indexOf(". ");
    if (idx !== -1) return trimmed.slice(idx + 2).trim();
  }
  return trimmed;
}

export function renderCvPdf(data: CvData, outputPath: string): Promise<void> {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `${data.personal.name} — CV`,
      Author: data.personal.name,
      Subject: "Curriculum Vitae",
      // Fixed date keeps the output byte-stable between builds of the same data.
      CreationDate: new Date(0),
      ModDate: new Date(0),
    },
  });

  const width = doc.page.width - MARGIN * 2;
  const left = MARGIN;

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const ensureSpace = (needed: number) => {
    if (doc.y + needed > doc.page.height - MARGIN) doc.addPage();
  };

  const sectionHeading = (label: string) => {
    ensureSpace(40);
    doc.moveDown(0.7);
    doc.font(FONT.bold).fontSize(10.5).fillColor(COLORS.accent);
    doc.text(label.toUpperCase(), left, doc.y, { characterSpacing: 1.2, width });
    const y = doc.y + 3;
    doc.moveTo(left, y).lineTo(left + width, y).lineWidth(0.6).strokeColor(COLORS.rule).stroke();
    doc.y = y + 8;
  };

  // Header
  const { personal } = data;
  doc.font(FONT.bold).fontSize(24).fillColor(COLORS.text).text(personal.name.toUpperCase(), left, MARGIN, {
    width,
    characterSpacing: 0.5,
  });
  doc.moveDown(0.15);
  doc.font(FONT.regular).fontSize(12).fillColor(COLORS.accent).text(`${personal.currentRole} · ${personal.domain}`, { width });
  doc.moveDown(0.3);
  doc
    .font(FONT.regular)
    .fontSize(9.5)
    .fillColor(COLORS.muted)
    .text(`${personal.location}   |   ${personal.phone}   |   `, { continued: true })
    .fillColor(COLORS.text)
    .text(personal.email, { link: `mailto:${personal.email}`, underline: false });

  // Summary
  sectionHeading("Summary");
  doc.font(FONT.regular).fontSize(10).fillColor(COLORS.text).text(pdfSummary(personal.summary), left, doc.y, {
    width,
    lineGap: 2,
  });

  // Experience
  sectionHeading("Experience");
  data.experience.forEach((exp, i) => {
    ensureSpace(70);
    if (i > 0) doc.moveDown(0.55);
    const top = doc.y;
    doc.font(FONT.bold).fontSize(11).fillColor(COLORS.text);
    doc.text(`${exp.title} — ${exp.company}, ${exp.location}`, left, top, { width: width - 210 });
    const afterTitle = doc.y;
    doc.font(FONT.regular).fontSize(9).fillColor(COLORS.muted);
    doc.text(exp.period, left + width - 210, top + 1.5, { width: 210, align: "right" });
    doc.y = Math.max(afterTitle, doc.y);
    doc.moveDown(0.25);

    doc.font(FONT.regular).fontSize(9.6).fillColor(COLORS.text).text(exp.description, left, doc.y, {
      width,
      lineGap: 1.5,
    });

    exp.bullets?.forEach((b) => {
      ensureSpace(30);
      doc.moveDown(0.25);
      const bulletY = doc.y;
      doc.font(FONT.bold).fontSize(9.6).fillColor(COLORS.accent).text("•", left + 4, bulletY);
      doc.fillColor(COLORS.text);
      const textOpts = { width: width - 16, lineGap: 1.5 };
      if (b.title) {
        doc.font(FONT.bold).text(`${b.title}: `, left + 16, bulletY, { ...textOpts, continued: true });
        doc.font(FONT.regular).text(b.text, textOpts);
      } else {
        doc.font(FONT.regular).text(b.text, left + 16, bulletY, textOpts);
      }
    });

    if (exp.tags.length > 0) {
      doc.moveDown(0.3);
      doc.font(FONT.italic).fontSize(8.8).fillColor(COLORS.muted).text(exp.tags.join("  ·  "), left, doc.y, { width });
    }
  });

  // Education
  sectionHeading("Education");
  data.education.forEach((edu, i) => {
    ensureSpace(40);
    if (i > 0) doc.moveDown(0.5);
    const top = doc.y;
    doc.font(FONT.bold).fontSize(10.5).fillColor(COLORS.text).text(`${edu.degree} — ${edu.field}`, left, top, {
      width: width - 210,
    });
    const afterTitle = doc.y;
    doc.font(FONT.regular).fontSize(9).fillColor(COLORS.muted).text(edu.period, left + width - 210, top + 1.5, {
      width: 210,
      align: "right",
    });
    doc.y = Math.max(afterTitle, doc.y);
    doc.font(FONT.regular).fontSize(9.6).fillColor(COLORS.muted).text(edu.institution, left, doc.y, { width });
    if (edu.specializationLabel && edu.specializationText) {
      doc.fillColor(COLORS.text).text(`${edu.specializationLabel}: ${edu.specializationText}`, { width });
    }
  });

  // Skills
  sectionHeading("Skills");
  data.skills.forEach((cat) => {
    ensureSpace(20);
    doc.font(FONT.bold).fontSize(9.6).fillColor(COLORS.text).text(`${cat.category}: `, left, doc.y, {
      width,
      continued: true,
    });
    doc.font(FONT.regular).text(cat.items.join(", "), { width, lineGap: 1.5 });
    doc.moveDown(0.2);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  const out = path.resolve(process.argv[2] ?? path.join(__dirname, "..", "public", "cv.pdf"));
  await renderCvPdf(cvData, out);
  console.log(`CV PDF written to ${path.relative(process.cwd(), out)}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
