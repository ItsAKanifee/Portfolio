#!/usr/bin/env node
// Simple helper to add a project to projects.json and create its Texts entry.
// Usage (simple): node Scripts/add_project.js "Title" "image/path.png" "Short description" --repo=https://... --link=https://... --tags=tag1,tag2 --text="Long text for popup"

const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
if (argv.length < 3) {
  console.error('Usage: node Scripts/add_project.js "Title" "image/path.png" "Short description" [--repo=..] [--link=..] [--tags=tag1,tag2] [--text="Long text"]');
  process.exit(1);
}

const title = argv[0];
const image = argv[1];
const description = argv[2];

const opts = {};
argv.slice(3).forEach(arg => {
  const m = arg.match(/^--([^=]+)=(.*)$/);
  if (m) opts[m[1]] = m[2];
});

const projectsPath = path.join(__dirname, '..', '..', 'projects.json');
const textsDir = path.join(__dirname, '..', '..', 'Texts');

let projects = [];
if (fs.existsSync(projectsPath)) {
  projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
}

const maxId = projects.reduce((m, p) => Math.max(m, Number(p.id)), -1);
const newId = maxId + 1;
const textFileName = `Project${newId}.txt`;
const textFilePath = path.join(textsDir, textFileName);

const longText = opts.text || `Description for ${title}`;
fs.writeFileSync(textFilePath, longText, 'utf8');

const newProject = {
  id: newId,
  title,
  image,
  description,
  tags: opts.tags ? opts.tags.split(',').map(t=>t.trim()).filter(Boolean) : [],
  textFile: `Texts/${textFileName}`
};
if (opts.repo) newProject.repo = opts.repo;
if (opts.link) newProject.link = opts.link;

projects.push(newProject);
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf8');

console.log('Added project', newProject);
console.log('Created text file at', textFilePath);
console.log('Updated', projectsPath);
