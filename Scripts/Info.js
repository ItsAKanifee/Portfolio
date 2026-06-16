const dialog = document.querySelector("dialog");
var InfoText = "";

// close the dialog when clicking outside the dialog content (backdrop)
if (dialog) {
    dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        // if the click is outside the dialog's bounding rect, close it
        if (typeof e.clientX === 'number' && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) {
            try { dialog.close(); } catch (err) { /* ignore */ }
        }
    });
}

function Popup(i) {
    TextOnPopup(i);
    dialog.showModal();
}

function firstSentence(text) {
    if (!text) return '';
    const s = text.trim().split(/(?<=[.!?])\s+/)[0];
    return s;
}

function parseMetaFromText(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const meta = {};
    lines.forEach(l => {
        const m = l.match(/^\s*(TL;?DR|Tldr|Tech|Tech Stack|Role|Impact|Demo):\s*(.*)/i);
        if (m) {
            const key = m[1].toLowerCase();
            const val = m[2].trim();
            if (/tl/i.test(key)) meta.tldr = val;
            else if (/tech/i.test(key)) meta.tech = val.split(/[,;]/).map(x => x.trim()).filter(Boolean);
            else if (/role/i.test(key)) meta.role = val;
            else if (/impact/i.test(key)) meta.impact = val;
            else if (/demo/i.test(key)) meta.demo = val;
        }
    });
    return meta;
}

function TextOnPopup(i) {
    // determine text source and project data
    let textPath = 'Texts/Project' + i + '.txt';
    let project = null;
    try {
        if (window.projectsData && Array.isArray(window.projectsData)) {
            project = window.projectsData.find(x => String(x.id) === String(i));
            if (project && project.textFile) textPath = project.textFile;
        }
    } catch (e) { /* ignore and fallback */ }

    fetch(textPath)
        .then(response => response.text())
        .then(data => {
            InfoText = data;
            window.InfoText = InfoText;
            // build structured popup
            const meta = parseMetaFromText(data || '');
            const title = project && project.title ? project.title : ('Project ' + i);
            const tldr = meta.tldr || (project && project.description ? firstSentence(project.description) : firstSentence(data));
            const tech = meta.tech || (project && project.tags ? project.tags : []);
            const role = meta.role || (project && project.role ? project.role : null);
            const impact = meta.impact || null;
            const demo = meta.demo || (project && project.demo ? project.demo : null);

            const container = document.getElementById('dialog-content');
            if (!container) return;
            container.innerHTML = '';

            const h = document.createElement('h2');
            h.textContent = title;
            container.appendChild(h);

            if (tldr) {
                const el = document.createElement('p');
                el.className = 'popup-tldr';
                el.textContent = tldr;
                container.appendChild(el);
            }

            if (tech && Array.isArray(tech) && tech.length) {
                const techWrap = document.createElement('div');
                techWrap.className = 'popup-tech';
                const label = document.createElement('strong');
                label.textContent = 'Tech & Tools: ';
                techWrap.appendChild(label);
                tech.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'popup-tech__tag';
                    span.textContent = t;
                    techWrap.appendChild(span);
                });
                container.appendChild(techWrap);
            }

            // Links (repo / link / demo)
            const links = document.createElement('div');
            links.className = 'popup-links';
            if (project && project.repo) {
                const a = document.createElement('a');
                a.href = project.repo;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = 'Repository';
                links.appendChild(a);
            }
            if (project && project.link) {
                const a = document.createElement('a');
                a.href = project.link;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = 'Live Demo';
                links.appendChild(a);
            }
            if (demo) {
                const a = document.createElement('a');
                a.href = demo;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = 'Demo';
                links.appendChild(a);
            }
            if (links.childElementCount) container.appendChild(links);

            if (role) {
                const r = document.createElement('p');
                r.className = 'popup-role';
                r.innerHTML = '<strong>Role:</strong> ' + role;
                container.appendChild(r);
            }

            if (impact) {
                const im = document.createElement('p');
                im.className = 'popup-impact';
                im.innerHTML = '<strong>Impact:</strong> ' + impact;
                container.appendChild(im);
            }

            // full details
            const details = document.createElement('div');
            details.className = 'popup-details';
            const pre = document.createElement('pre');
            pre.className = 'popup-pre';
            pre.textContent = data;
            details.appendChild(pre);
            container.appendChild(details);
        })
        .catch(error => console.error(error));
}

function AboutMe() {
    fetch('Texts/AboutMe.txt')
        .then(response => response.text())
        .then(data => { InfoText = data; window.InfoText = InfoText; })
        .then(() => {
            const container = document.getElementById('dialog-content');
            if (container) container.innerText = window.InfoText || '';
            dialog.showModal();
        })
        .catch(error => console.error(error));
}

function showInfoDialog() {
    fetch('Texts/Info.txt')
        .then(response => response.text())
        .then(data => { InfoText = data; window.InfoText = InfoText; })
        .then(() => {
            const container = document.getElementById('dialog-content');
            if (container) container.innerText = window.InfoText || '';
            dialog.showModal();
        })
        .catch(error => console.error(error));
}

window.InfoText = InfoText;
window.Popup = Popup;
window.AboutMe = AboutMe;
window.showInfoDialog = showInfoDialog;