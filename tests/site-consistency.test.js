"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const pages = [
  "index.html",
  "aboutus.html",
  "bioinfo.html",
  "carrer.html",
  "contact.html",
  "Facilities.html",
  "patent.html",
  "project.html",
  "registration.html",
  "Research.html",
  "ScientificWritings.html",
  "summar_certificate_syllabus.html",
  "training.html"
];

function readPage(file) {
  return fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
}

function normalizeMarkup(markup) {
  return markup.replace(/\s+/g, " ").trim();
}

test("all production pages share one header and footer", () => {
  const headers = [];
  const footers = [];

  pages.forEach((file) => {
    const html = readPage(file);
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/);
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
    assert.ok(header, `${file} has a shared site header`);
    assert.ok(footer, `${file} has a shared site footer`);
    headers.push(normalizeMarkup(header[0]));
    footers.push(normalizeMarkup(footer[0]));
    assert.equal((html.match(/<header class="site-header">/g) || []).length, 1, `${file} has one header`);
    assert.equal((html.match(/<footer class="site-footer">/g) || []).length, 1, `${file} has one footer`);
    assert.match(html, /<main id="main">[\s\S]*<\/main>/, `${file} has a main landmark`);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${file} has one page-level heading`);
    assert.match(html, /class="skip-link" href="#main"/, `${file} has a skip link`);
    assert.match(html, /<script src="js\/site\.js"><\/script>/, `${file} loads shared site behavior`);
    assert.match(html, /<script src="js\/ciencia-chatbot\.js"><\/script>/, `${file} loads the chatbot`);
    assert.doesNotMatch(html, /jquery(?:-[0-9.]+)?\.js|bootstrap\.js/i, `${file} has no legacy JavaScript dependencies`);
    assert.match(html, /<button class="nav-toggle"[^>]*aria-controls="primary-navigation"/, `${file} has an accessible mobile menu control`);
    assert.match(html, /<nav id="primary-navigation"/, `${file} has the controlled navigation landmark`);
    const ids = Array.from(html.matchAll(/\bid=["']([^"']+)["']/gi), (match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${file} has unique IDs`);
    assert.ok(ids.every((id) => !/\s/.test(id)), `${file} has no whitespace in IDs`);
  });

  assert.ok(headers.every((header) => header === headers[0]), "header markup is identical on every production page");
  assert.ok(footers.every((footer) => footer === footers[0]), "footer markup is identical on every production page");
});

test("all production pages use the shared stylesheet without Bootstrap", () => {
  pages.forEach((file) => {
    const html = readPage(file);
    assert.match(html, /<link rel="stylesheet" href="css\/ciencia\.css">/, `${file} loads the global design system`);
    assert.doesNotMatch(html, /(?:bootstrap|custom-styles)\.css/i, `${file} does not load legacy framework styles`);
  });
});

test("registration actions point only to the CLS Google Form", () => {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header";

  pages.forEach((file) => {
    const html = readPage(file);
    const links = Array.from(
      html.matchAll(/<a\b([^>]*\bhref=["']([^"']+)["'][^>]*)>([\s\S]*?)<\/a>/gi),
      ([, attributes, href, content]) => ({
        attributes,
        href,
        text: content.replace(/<[^>]*>/g, "").trim()
      })
    ).filter((link) => link.href === formUrl);

    assert.ok(links.length > 0, `${file} exposes the CLS registration form`);
    links.forEach(({ attributes, text }) => {
      assert.equal(text, "CLS Internship and Project Registration Form", `${file} uses the required registration label`);
      assert.match(attributes, /\btarget="_blank"/, `${file} opens the form in a new tab`);
      assert.match(attributes, /\brel="noopener noreferrer"/, `${file} protects the new tab`);
    });
    assert.doesNotMatch(html, /<a\b[^>]*href=["'][^"']*registration\.html/i, `${file} has no link to the old registration page`);
    assert.doesNotMatch(html, /<a\b[^>]*href=["'][^"']*ciencia_registration_form\.doc/i, `${file} has no link to the old downloadable form`);
    assert.doesNotMatch(html, /<a\b[^>]*href=["'][^"']*1LWSkVokO3iKkLfNHR-q8b_l1t9-S8QwItkOggMWeubQ/i, `${file} has no link to the previous Google Form`);
  });

  assert.doesNotMatch(readPage("registration.html"), /<form\b/i, "the old HTML enquiry form is removed");
  assert.doesNotMatch(
    fs.readFileSync(path.join(root, "js", "site.js"), "utf8"),
    /#enquiry-form/,
    "the old email-enquiry form handler is removed"
  );
});

test("production images reserve layout space and defer below-fold photographs", () => {
  pages.forEach((file) => {
    const html = readPage(file);
    const images = Array.from(html.matchAll(/<img\b[^>]*>/gi), ([image]) => image);
    images.forEach((image) => {
      assert.match(image, /\bwidth=["'][1-9]\d*["']/i, `${file} image has an intrinsic width`);
      assert.match(image, /\bheight=["'][1-9]\d*["']/i, `${file} image has an intrinsic height`);
    });
    if (html.includes('class="hero__media"')) {
      assert.match(html, /class="hero__media"[^>]*fetchpriority="high"/, `${file} prioritizes its hero image`);
    }
  });
});

test("homepage project links still select their project panel from the URL fragment", () => {
  const homepage = readPage("index.html");
  const project = readPage("project.html");
  const subjects = Array.from(project.matchAll(/data-subject="([^"]+)"/g), ([, subject]) => subject.toLowerCase());
  const topics = Array.from(
    project.matchAll(/<div data-project-topic="([^"]+)"[^>]*>\s*<h2\b[^>]*>(.*?)<\/h2>/gis),
    ([, subject, heading]) => [subject.toLowerCase(), heading.replace(/<[^>]*>/g, "").trim().toLowerCase()]
  );
  const fragments = Array.from(homepage.matchAll(/href="project\.html#([^"]+)"/g), ([, fragment]) => decodeURIComponent(fragment).trim().toLowerCase());

  assert.ok(fragments.length > 0, "homepage includes project-topic links");
  fragments.forEach((fragment) => {
    assert.ok(
      subjects.includes(fragment) || topics.some(([subject, heading]) => subject === fragment || heading === fragment),
      `project topic fragment ${fragment} maps to a project selector`
    );
  });
});

test("production links do not point to missing local page fragments", () => {
  const missing = [];
  pages.forEach((file) => {
    const html = readPage(file);
    const links = Array.from(html.matchAll(/\bhref=["']([^"']+)["']/gi), ([, href]) => href);
    links.forEach((href) => {
      const url = new URL(href, `https://ciencia.invalid/${file}`);
      if (url.origin !== "https://ciencia.invalid" || !url.hash) return;
      const targetFile = url.pathname.split("/").pop() || file;
      const targetPath = path.resolve(root, targetFile);
      if (!fs.existsSync(targetPath)) return;
      const targetHtml = fs.readFileSync(targetPath, "utf8").replace(/^\uFEFF/, "");
      const fragment = decodeURIComponent(url.hash.slice(1));
      const ids = Array.from(targetHtml.matchAll(/\bid=["']([^"']+)["']/gi), ([, id]) => id);
      if (ids.includes(fragment)) return;
      if (targetFile === "project.html") {
        const subjects = Array.from(targetHtml.matchAll(/data-subject="([^"]+)"/g), ([, subject]) => subject.toLowerCase());
        const headings = Array.from(
          targetHtml.matchAll(/<div data-project-topic="([^"]+)"[^>]*>\s*<h2\b[^>]*>(.*?)<\/h2>/gis),
          ([, subject, heading]) => [subject.toLowerCase(), heading.replace(/<[^>]*>/g, "").trim().toLowerCase()]
        );
        const normalized = fragment.trim().toLowerCase();
        if (subjects.includes(normalized) || headings.some(([subject, heading]) => subject === normalized || heading === normalized)) return;
      }
      missing.push(`${file}: ${href}`);
    });
  });
  assert.deepEqual(missing, []);
});

test("legacy page URLs redirect to active pages and preserve their snapshots", () => {
  const archivedPages = fs.readdirSync(path.join(root, "archive", "legacy-pages"));
  assert.equal(archivedPages.length, 12, "all twelve legacy page snapshots are archived");
  archivedPages.forEach((file) => {
    const redirect = readPage(path.join("legacy", file));
    const snapshot = fs.readFileSync(path.join(root, "archive", "legacy-pages", file), "utf8").replace(/^\uFEFF/, "");
    const target = `../${file}`;
    assert.match(redirect, new RegExp(`url=${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `${file} redirects to its active page`);
    assert.match(redirect, /window\.location\.search \+ window\.location\.hash/, `${file} preserves query and fragment components`);
    assert.match(redirect, /rel="canonical"/, `${file} identifies the canonical active URL`);
    assert.ok(snapshot.includes("<html"), `${file} snapshot remains preserved`);
  });
});

test("static hosting configuration contains no SMTP credential settings", () => {
  const config = fs.readFileSync(path.join(root, "web.config"), "utf8").replace(/^\uFEFF/, "");
  assert.doesNotMatch(config, /<appSettings\b/i);
});

test("all production pages keep their local links and assets resolvable", () => {
  const missing = [];
  pages.forEach((file) => {
    const html = readPage(file);
    const attributes = html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi);
    for (const [, value] of attributes) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue;
      const pathname = decodeURIComponent(value.split(/[?#]/, 1)[0]);
      if (!pathname) continue;
      const target = path.resolve(root, pathname.replace(/^\//, ""));
      if (!target.startsWith(root + path.sep) && target !== root) {
        missing.push(`${file}: path escapes site root: ${value}`);
      } else if (!fs.existsSync(target)) {
        missing.push(`${file}: missing ${value}`);
      }
    }
  });
  assert.deepEqual(missing, []);
});
