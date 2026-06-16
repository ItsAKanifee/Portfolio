# Portfolio

A portfolio of projects that I have done

How to add a project

- Option A (manual):
  1. Add an entry to `projects.json` with fields: `id`, `title`, `image`, `description`, optional `repo` or `link`, `tags` (array), and `textFile` (path to popup text file).
  2. Create the popup text file under `Texts/` and point `textFile` to it.
- Option B (helper script):
  Run the Node helper to add a project and create the text file:

```bash
node Scripts/add_project.js "Title" "images/my.png" "Short description" --repo=https://github.com/... --tags=tag1,tag2 --text="Long popup text"
```

The site loads `projects.json` at runtime; after adding files, deploy or push changes to update the site.
