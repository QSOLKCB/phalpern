# Physics X 95 — History Lab

An offline-first multimedia history-of-physics lab about **people, arguments, and experiments**, built as an independent educational tribute to physicist and science writer **Paul Halpern**.

## Launch the lab

### [Open Physics X 95 →](https://qsolkcb.github.io/phalpern/)

The interface takes its cues from mid-1990s CD-ROM encyclopedias and from the architecture of [Synergetics 95](https://qsolkcb.github.io/synergetics2/): a contents explorer, bevelled toolbars, local favourites, searchable reference cards, classroom pathways, and interactive canvas exhibits.

## What is included

- **16 substantial, original educator articles** spanning the Mach–Boltzmann atom debate, entropy and probability, Einstein’s 1905 papers, Solvay 1927, Einstein and Bohr, Physics X, QED, Feynman and Wheeler, cosmic-origin rivalries, and the multiverse;
- **7 dependency-free interactive exhibits**:
  - Mach–Boltzmann ideal-gas chamber;
  - exact finite Boltzmann entropy board;
  - seeded Brownian-motion ensemble;
  - Einstein 1905 paper constellation;
  - special-relativistic light clock;
  - all **29** participants in the 1927 Solvay photograph, including the reversible **17-laureate** filter;
  - Fraunhofer double-slit interference bench;
- a **20-event timeline** from kinetic theory to *The Great Atom Debate*;
- a **55-term linked glossary**;
- **5 complete classroom pathways** with audience, duration, objectives, materials, timed sequences, local progress, and assessment prompts;
- source trails using author, publisher, university, Library of Congress, Solvay Institutes, CERN, Nobel Prize, Caltech, AIP, Optica, and Harvard records;
- local bookmarks, studied-topic tracking, pathway progress, teacher mode, dark mode, deep links, printing, and offline caching;
- no framework, npm dependency, CDN, account, cookie, tracker, or server runtime.

## Editorial posture

Historical physics mixes equations, archives, recollection, interpretation, and teaching models. Physics X 95 keeps those layers visible:

| Label | Meaning |
|---|---|
| **Standard physics** | A conventional model, equation, or result with its assumptions stated. |
| **Historical record** | A claim tied to a named archive, publication record, or reputable historical source. |
| **Interpretive** | A reading of significance or motive, presented as interpretation rather than laboratory fact. |
| **Schematic model** | A deliberately simplified visual that teaches a relationship without claiming complete physical fidelity. |

The Brownian canvas, for example, teaches ensemble statistics; it does not claim to reproduce Perrin’s apparatus or resolve real fluid molecules. The Solvay map restores names to an institutional photograph; it does not substitute for the conference proceedings.

## Run locally

Open `index.html` directly in a modern browser. The core encyclopedia and atlas work from `file://`.

A local server enables service-worker installation and offline caching:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Validate

Node is used only for repository checks; the website itself does not require Node.

```sh
node --check js/content.js
node --check js/math.js
node --check js/atlas.js
node --check js/app.js
node --check sw.js
node tests/math.test.js
node tests/content.test.js
node tests/static.test.js
node tests/service-worker.test.js
```

The checks cover:

- Lorentz factors, light-clock geometry, binomial multiplicity, dimensionless Boltzmann entropy, deterministic random replay, diffusion statistics, diffraction intensity, and ideal-gas scaling;
- article, source, glossary, pathway, timeline, book, and related-link integrity;
- all four 1905 papers and all 29 Solvay participants;
- local-only runtime assets, content security policy, accessible shell landmarks, theme and reduced-motion support, and offline cache lifetime;
- current GitHub Pages action generations.

## GitHub Pages

The workflow at `.github/workflows/pages.yml` validates pull requests and deploys `main`:

- `actions/checkout@v7`
- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v5`
- `actions/deploy-pages@v5`

For a new repository, select **Settings → Pages → Build and deployment → GitHub Actions** once, then merge a validated change.

## Architecture

```text
index.html                 accessible application shell and program chrome
styles.css                original 1990s multimedia-encyclopedia interface
js/content.js             articles, sources, glossary, pathways, timeline, participant data
js/math.js                tested relativity, probability, diffusion, and diffraction helpers
js/atlas.js               dependency-free canvas exhibits
js/app.js                 routing, search, progress, teacher mode, and views
sw.js                     same-origin offline cache
manifest.webmanifest      installable web-app metadata
tests/                    math, content, static-shell, and service-worker checks
.github/workflows/        validation and GitHub Pages deployment
```

## Source and copyright boundary

The software and educator prose in this repository are original. The project links to Paul Halpern’s books, public author essays, and external institutional records; it does **not** reproduce book chapters, archival photographs, conference proceedings, or proprietary encyclopedia assets.

See the in-app **Reference Desk** and [NOTICE.md](NOTICE.md) for provenance and third-party boundaries.

## Independence

Independent educational software by Trent Slade / QSOL-IMC. No affiliation or endorsement is claimed from Paul Halpern, Saint Joseph’s University, Basic Books, Caltech, the Solvay Institutes, CERN, the Nobel Foundation, the Library of Congress, AIP, Optica, Harvard University, Microsoft, or maintainers of linked resources.

## License

Source code and original lab prose are available under the [Mozilla Public License 2.0](LICENSE). Book titles, names, marks, archival material, and linked third-party content remain under their respective rights.
