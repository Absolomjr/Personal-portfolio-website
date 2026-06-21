# Absolom Orianga — Personal Portfolio

A clean, light-themed, single-page portfolio website built for recruiters and visitors
to learn about Absolom Orianga and explore his work. No build tools, no dependencies —
just open it in a browser.

## ✨ Features

- **Light, modern design** with a teal → cyan accent (not dark).
- Sticky top navigation: **Home, About, Experience, Projects, Skills, Contact**.
- Animated hero with code card, stat counters, and gradient blobs.
- Scroll-spy nav highlighting, reveal-on-scroll animations.
- Experience timeline, project cards, skills toolkit, and a working contact form
  (opens the visitor's email client pre-filled).
- Fully responsive with a mobile slide-in menu.
- Accessible: respects `prefers-reduced-motion`.

## 🚀 Run it

Just open `index.html` in any browser. For live-reload while editing, you can use a
simple local server:

```bash
# Python 3
python -m http.server 5500
# then visit http://localhost:5500
```

## 🌐 Deploy (free)

- **Netlify / Vercel:** drag-and-drop this folder, or connect a Git repo.
- **GitHub Pages:** push these files to a repo and enable Pages on the `main` branch.

## ✏️ What to personalise

Most content lives in `index.html` — search for these and update with your real details:

| Section      | What to edit |
|--------------|--------------|
| **Experience** | Replace the timeline entries with your exact roles, companies and dates from LinkedIn. |
| **Projects** | Swap links/descriptions; point each card to its specific GitHub repo URL. |
| **Contact** | Email is set to `support@logoscloudservices.com` — change in `index.html` and `script.js` if needed. |
| **Stats** | Hero numbers (`data-count`) — repos, followers, technologies. |
| **Photo** | The hero shows initials "AO". To use a real photo, replace the `.avatar` div with an `<img>`. |

### Files

```
index.html    # structure & content
styles.css    # all styling and the colour theme (CSS variables at the top)
script.js     # nav, scroll-spy, animations, contact form
```

To change the colour theme, edit the CSS variables under `:root` in `styles.css`
(`--teal`, `--cyan`, `--grad`, etc.).

---

Built with care in Kampala 🇺🇬
