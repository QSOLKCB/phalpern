'use strict';

const assert = require('node:assert/strict');
const C = require('../js/content.js');

const unique = (values, label) => assert.equal(new Set(values).size, values.length, `${label} must be unique`);
const articleIds = C.articles.map((article) => article.id);
const categoryIds = new Set(C.categories.map((category) => category.id));
const sourceIds = new Set(Object.keys(C.sources));
const atlasIds = new Set(C.atlas.map((entry) => entry.id));

assert.ok(C.articles.length >= 16, 'History lab contains at least sixteen substantive articles');
unique(articleIds, 'Article IDs');
unique(C.categories.map((category) => category.id), 'Category IDs');

for (const article of C.articles) {
  assert.match(article.id, /^[a-z0-9-]+$/);
  assert.ok(categoryIds.has(article.category), `${article.id} has a valid category`);
  assert.ok(C.claimLabels[article.status], `${article.id} declares a valid editorial label`);
  assert.ok(article.title.length >= 8, `${article.id} has a useful title`);
  assert.ok(article.deck.length >= 60, `${article.id} has a substantial deck`);
  assert.ok(article.summary.length >= 100, `${article.id} has a substantial summary`);
  assert.ok(article.atGlance.length >= 3, `${article.id} has at-a-glance points`);
  assert.ok(article.sections.length >= 3, `${article.id} has at least three sections`);
  assert.ok(article.sections.every((section) => section.paragraphs.length >= 2), `${article.id} sections contain developed prose`);
  assert.ok(article.sections.flatMap((section) => section.paragraphs).join(' ').length >= 1200, `${article.id} contains substantial original teaching prose`);
  assert.ok(article.activity.steps.length >= 4, `${article.id} has an activity sequence`);
  assert.ok(article.check.question && article.check.answer, `${article.id} has a knowledge check`);
  assert.ok(article.teacherNote.length >= 50, `${article.id} has a teacher note`);
  article.sources.forEach((source) => assert.ok(sourceIds.has(source), `${article.id} references source ${source}`));
  article.related.forEach((related) => assert.ok(articleIds.includes(related), `${article.id} related article ${related} exists`));
}

assert.ok(C.glossary.length >= 55, 'Glossary contains at least fifty-five terms');
unique(C.glossary.map((entry) => entry.term.toLocaleLowerCase()), 'Glossary terms');
C.glossary.forEach((entry) => {
  assert.ok(entry.definition.length >= 55, `${entry.term} has a useful definition`);
  if (entry.article) assert.ok(articleIds.includes(entry.article), `${entry.term} links to a valid article`);
});

assert.equal(C.lessonPaths.length, 5, 'Five complete classroom pathways are included');
unique(C.lessonPaths.map((lesson) => lesson.id), 'Pathway IDs');
C.lessonPaths.forEach((lesson) => {
  assert.ok(lesson.objectives.length >= 3, `${lesson.id} has objectives`);
  assert.ok(lesson.materials.length >= 2, `${lesson.id} has materials`);
  assert.ok(lesson.sequence.length >= 5, `${lesson.id} has a complete sequence`);
  assert.ok(lesson.assessment.length >= 2, `${lesson.id} has assessment prompts`);
  lesson.sequence.forEach((step) => {
    if (step.article) assert.ok(articleIds.includes(step.article), `${lesson.id} links article ${step.article}`);
    if (step.atlas) assert.ok(atlasIds.has(step.atlas), `${lesson.id} links exhibit ${step.atlas}`);
  });
});

assert.equal(C.atlas.length, 7, 'Seven interactive exhibits are included');
unique(C.atlas.map((entry) => entry.id), 'Atlas IDs');
C.atlas.forEach((entry) => {
  assert.ok(C.claimLabels[entry.status], `${entry.id} declares a valid model label`);
  assert.ok(articleIds.includes(entry.article), `${entry.id} links to a valid article`);
  assert.ok(entry.description.length >= 90, `${entry.id} declares a useful model boundary`);
});

assert.equal(C.annusPapers.length, 4, 'The four 1905 papers are represented');
unique(C.annusPapers.map((paper) => paper.id), '1905 paper IDs');

assert.equal(C.solvayParticipants.length, 29, 'All 29 Solvay 1927 participants are represented');
assert.equal(C.solvayParticipants.filter((person) => person.laureate).length, 17, 'The institutional seventeen-laureate count is represented');
unique(C.solvayParticipants.map((person) => person.name), 'Solvay participant names');

assert.ok(C.timeline.length >= 20, 'Timeline has at least twenty events');
C.timeline.forEach((event) => {
  assert.ok(articleIds.includes(event.article), `${event.year} timeline event links a valid article`);
  assert.ok(sourceIds.has(event.source), `${event.year} timeline event links a valid source`);
});

Object.entries(C.sources).forEach(([id, source]) => {
  assert.match(source.url, /^https:\/\//, `${id} uses HTTPS`);
  assert.ok(source.kind && source.note, `${id} declares provenance type and note`);
});

console.log(`Physics X 95 content integrity: PASS (${C.articles.length} articles, ${C.glossary.length} terms, ${C.solvayParticipants.length} Solvay participants)`);
