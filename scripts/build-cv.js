const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ─── Helpers ─────────────────────────────────────────────

/** Format "2022-09" → "Sep 2022" */
function formatDate(dateStr) {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

/** Convert "2022-09" to a fractional year for positioning (e.g. 2022.67) */
function toFractionalYear(dateStr) {
    if (!dateStr) return new Date().getFullYear() + (new Date().getMonth() / 12);
    const [year, month] = dateStr.split('-');
    return parseInt(year, 10) + (parseInt(month, 10) - 1) / 12;
}

// ─── Timeline Generator ─────────────────────────────────

function generateTimeline(cv) {
    // Collect all entries with their type
    const entries = [];

    cv.education.forEach(edu => {
        entries.push({
            type: 'education',
            label: edu.degree.replace("'s Degree", ''),
            sub: edu.field.length > 30 ? edu.field.substring(0, 28) + '…' : edu.field,
            start: edu.startDate,
            end: edu.endDate
        });
    });

    cv.experience.forEach(exp => {
        entries.push({
            type: 'work',
            label: exp.title.replace('Software Engineer', 'SWE'),
            sub: exp.company,
            start: exp.startDate,
            end: exp.endDate
        });
    });

    // Calculate the global time range
    const allDates = entries.flatMap(e => [e.start, e.end].filter(Boolean));
    const minYear = Math.floor(Math.min(...allDates.map(toFractionalYear)));
    const maxYear = Math.ceil(Math.max(...allDates.map(toFractionalYear), toFractionalYear(null)));
    const totalSpan = maxYear - minYear;

    // Generate year markers
    const years = [];
    for (let y = minYear; y <= maxYear; y++) {
        const leftPct = ((y - minYear) / totalSpan) * 100;
        years.push(`<div class="tl-year" style="left: ${leftPct}%">${y}</div>`);
    }

    // Separate into education and work rows
    const eduEntries = entries.filter(e => e.type === 'education');
    const workEntries = entries.filter(e => e.type === 'work');

    function renderBar(entry, colorClass) {
        const startPct = ((toFractionalYear(entry.start) - minYear) / totalSpan) * 100;
        const endPct = ((toFractionalYear(entry.end) - minYear) / totalSpan) * 100;
        const widthPct = endPct - startPct;
        return `<div class="tl-bar ${colorClass}" style="left: ${startPct.toFixed(1)}%; width: ${widthPct.toFixed(1)}%">
            <span class="tl-bar-label">${entry.label}</span>
            <span class="tl-bar-sub">${entry.sub}</span>
        </div>`;
    }

    function renderRow(label, items, colorClass) {
        const bars = items.map(e => renderBar(e, colorClass)).join('\n                ');
        return `
            <div class="tl-row">
                <div class="tl-row-label ${colorClass}-label">${label}</div>
                <div class="tl-row-track">
                    ${bars}
                </div>
            </div>`;
    }

    return `
        <div class="tl-axis">
            ${years.join('\n            ')}
        </div>
        ${renderRow('Education', eduEntries, 'tl-edu')}
        ${renderRow('Work', workEntries, 'tl-work')}
    `;
}

// ─── HTML Builder ────────────────────────────────────────

function buildSkillsHTML(skills) {
    return skills.map(s =>
        `<div class="skill-item"><strong>${s.category}:</strong> ${s.items}</div>`
    ).join('\n            ');
}

function buildExperienceHTML(experience) {
    return experience.map(exp => {
        const dateRange = `${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}`;
        const bullets = exp.bullets.length
            ? `\n                <ul>${exp.bullets.map(b => `\n                    <li>${b}</li>`).join('')}\n                </ul>`
            : '';
        return `
            <div class="entry">
                <div class="entry-header">
                    <h3>${exp.title} — ${exp.company}, ${exp.location}</h3>
                    <span class="date">${dateRange}</span>
                </div>${bullets}
            </div>`;
    }).join('\n');
}

function buildEducationHTML(education) {
    return education.map(edu => {
        const dateRange = `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`;
        return `
            <div class="entry">
                <div class="entry-header">
                    <h3>${edu.degree}, ${edu.field}</h3>
                    <span class="date">${dateRange}</span>
                </div>
                <p class="institution">${edu.institution}</p>
            </div>`;
    }).join('\n');
}

// ─── Main ────────────────────────────────────────────────

(async () => {
    try {
        const cv = JSON.parse(fs.readFileSync('cv.json', 'utf-8'));
        const css = fs.readFileSync('style.css', 'utf-8');
        let template = fs.readFileSync('cv-template.html', 'utf-8');

        // Populate template
        template = template
            .replace('{{styles}}', css)
            .replace('{{name}}', cv.personal.name)
            .replace('{{location}}', cv.personal.location)
            .replace('{{phone}}', cv.personal.phone)
            .replace('{{email}}', cv.personal.email)
            .replace('{{summary}}', cv.summary)
            .replace('{{skills}}', buildSkillsHTML(cv.skills))
            .replace('{{timeline}}', generateTimeline(cv))
            .replace('{{experience}}', buildExperienceHTML(cv.experience))
            .replace('{{education}}', buildEducationHTML(cv.education));

        // Launch Puppeteer and render PDF (no Mermaid wait needed)
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setContent(template, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
            printBackground: true
        });

        await browser.close();

        // Write to both root and public/
        fs.writeFileSync('cv.pdf', pdfBuffer);
        fs.writeFileSync(path.join('public', 'cv.pdf'), pdfBuffer);
        console.log('Successfully generated cv.pdf (root + public/)');
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
