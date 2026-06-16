class ProjectTile {
    constructor(options = {}) {
        this.id = options.id ?? null;
        this.title = options.title ?? '';
        this.image = options.image ?? '';
        this.description = options.description ?? '';
        this.link = options.link ?? null;
        this.repo = options.repo ?? null;
        this.tags = options.tags ?? [];
        this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container || null;
        this.size = options.size || 'medium';
        this.onClick = options.onClick || null;
        this.el = null;
    }

    build() {
        const root = document.createElement('div');
        root.className = `project-tile project-tile--${this.size}`;
        if (this.id !== null) root.dataset.projectId = this.id;

        const img = document.createElement('img');
        img.className = 'project-tile__image';
        img.alt = this.title || 'Project image';
        if (this.image) img.src = this.image;

        const overlay = document.createElement('div');
        overlay.className = 'project-tile__overlay';

        const h = document.createElement('h3');
        h.className = 'project-tile__title';
        h.textContent = this.title;

        const p = document.createElement('p');
        p.className = 'project-tile__desc';
        // show a TL;DR (first sentence) on the tile for quick scan
        const desc = (this.description || '').trim();
        const tl = desc ? desc.split(/(?<=[.!?])\s+/)[0] : '';
        p.textContent = tl || desc;

        const tagWrap = document.createElement('div');
        tagWrap.className = 'project-tile__tags';
        // label the tech stack briefly
        if (this.tags && this.tags.length) {
            const techLabel = document.createElement('span');
            techLabel.className = 'project-tile__tech-label';
            techLabel.textContent = 'Tech: ';
            tagWrap.appendChild(techLabel);
        }
        this.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'project-tile__tag';
            span.textContent = t;
            tagWrap.appendChild(span);
        });

        const actions = document.createElement('div');
        actions.className = 'project-tile__actions';

        if (this.link) {
            const a = document.createElement('a');
            a.className = 'project-tile__link';
            a.href = this.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = 'Open';
            // prevent anchor clicks from bubbling to the tile root
            a.addEventListener('click', (ev) => ev.stopPropagation());
            actions.appendChild(a);
        }

        if (this.repo) {
            const a = document.createElement('a');
            a.className = 'project-tile__link';
            a.href = this.repo;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = 'Repo';
            // prevent anchor clicks from bubbling to the tile root
            a.addEventListener('click', (ev) => ev.stopPropagation());
            actions.appendChild(a);
        }
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'project-tile__more';
        more.textContent = 'Details';
        actions.appendChild(more);

        overlay.appendChild(h);
        overlay.appendChild(p);
        overlay.appendChild(tagWrap);
        overlay.appendChild(actions);

        root.appendChild(img);
        root.appendChild(overlay);

        this.el = root;

        more.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.Popup === 'function' && this.id !== null) {
                window.Popup(this.id);
            } else if (this.onClick) {
                this.onClick(this);
            }
        });

        root.addEventListener('click', (e) => {
            if (this.link) return; // let anchor handle it
            if (typeof window.Popup === 'function' && this.id !== null) {
                window.Popup(this.id);
            } else if (this.onClick) {
                this.onClick(this);
            }
        });

        return root;
    }

    render(container = null) {
        const target = container ? (typeof container === 'string' ? document.querySelector(container) : container) : this.container;
        if (!this.el) this.build();
        if (!target) throw new Error('No container provided to render ProjectTile.');
        target.appendChild(this.el);
        return this.el;
    }

    toObject() {
        return {
            id: this.id,
            title: this.title,
            image: this.image,
            description: this.description,
            link: this.link,
            tags: this.tags,
        };
    }

    static createGrid(containerSelector, items = []) {
        const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
        if (!container) throw new Error('createGrid: container not found');
        const tiles = items.map(data => {
            const t = new ProjectTile(Object.assign({container}, data));
            t.render(container);
            return t;
        });
        return tiles;
    }
}

window.ProjectTile = ProjectTile;