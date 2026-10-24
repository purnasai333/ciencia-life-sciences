# Ciencia Life Sciences website

Static production website. Existing HTML page names and public asset paths remain at the site root to preserve URLs.

## Production pages

The root contains the homepage and 12 named content pages. `ciencia-life-sciences-complete-guide.html` is a separate print-friendly reference.

## Assets

- `css/` contains the shared Ciencia and chatbot stylesheets.
- `js/` contains shared site behavior and the source-grounded chatbot.
- `img/` contains website images. Existing paths are retained.
- `ciencia_registration_form.doc` and `Ciencia-Life-Sciences-Complete-Information-Guide.pdf` are retained documents.

## Maintenance

- Run the Node regression suite with `node --test tests\\ciencia-chatbot.test.js tests\\site-consistency.test.js`.
- `tests/` contains chatbot and production-page consistency tests.
- `archive/legacy-pages/` preserves the former legacy HTML snapshots. The corresponding paths in `legacy/` now redirect to the active root pages.
- `archive/development-snapshots/` preserves the superseded page-generation scripts; they are not part of the current build.
- `archive/css-backups/` preserves the former CSS backups.
- The website has no required local Python environment or build step.

## Deployment

Deploy the root HTML pages, `css/`, `js/`, `img/`, linked documents, and `web.config` to the existing hosting root. Keep the HTML and asset paths unchanged. The `archive/` and `tests/` directories are maintenance material, not production runtime dependencies.

Active enquiry forms open the visitor's email application using `mailto:`. No SMTP credentials are configured in the static site.
