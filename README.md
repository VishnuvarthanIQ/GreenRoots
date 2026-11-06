# GreenRoots – Farmer Producer Company Website

A modern, responsive, content-rich website designed for an agricultural Farmer Producer Company (FPC).

Built strictly with **Pure Frontend Technologies**:
- **HTML5**: Semantic, accessible markup across all pages
- **CSS3**: Custom design system, CSS variables, dark-mode styling, and animations
- **Tailwind CSS**: Utility classes via CDN
- **Bootstrap 5 & Bootstrap Icons**: Responsive grid, navigation, modals, and iconography
- **Vanilla JavaScript**: Modular, self-contained client-side logic (zero frameworks, zero build steps)

---

## Project Structure

```
GreenRoots/
├── index.html                # Farming Excellence (Main Homepage)
├── home-2.html               # Our Agricultural Story (Secondary Homepage)
├── about.html                # About Us & Leadership Team
├── services.html             # Agricultural Services
├── service-details.html      # Individual Service Deep Dive
├── products.html             # Produce, Grains, Vegetables & Millets
├── membership.html           # Farmer Membership & Benefits
├── blog.html                 # Agricultural Knowledge Base & Field Guides
├── blog-details.html         # Agronomic Articles, Schedules & FAQs
├── pricing.html              # Service & Membership Tier Matrix
├── contact.html              # Farmer Inquiries, Office & Google Maps
├── 404.html                  # Custom 404 Error Page
├── coming-soon.html          # Maintenance / Launch Notice
│
├── assets/
│   ├── css/
│   │   ├── style.css         # Primary styles & theme variables
│   │   ├── dark-mode.css     # Dark mode contrast overrides
│   │   ├── responsive.css    # Multi-viewport responsive rules
│   │   └── rtl.css           # Right-to-Left bidirectional support
│   │
│   ├── js/
│   │   ├── main.js           # Core interactivity & dynamic article rendering
│   │   ├── data.js           # Agricultural catalog & blog data store
│   │   ├── validation.js     # Real-time form validation & digit constraints
│   │   ├── theme.js          # Dark/Light theme toggle persistence
│   │   ├── rtl.js            # RTL/LTR language direction handler
│   │   ├── products.js       # Product filtering & search
│   │   └── animations.js     # Scroll reveal observers
│   │
│   ├── img/                  # 100% local, authentic agricultural images
│   └── videos/               # 1080p Full HD agricultural background videos
```

---

## How to Run

Because this is a **100% client-side static website**, no backend, database, or Python environment is required:

1. **Directly in Browser:** Double-click [`index.html`](index.html) to open in Chrome, Edge, Firefox, or Safari.
2. **VS Code Live Server:** Right-click `index.html` and select **Open with Live Server**.
3. **Any Static Server:** Run `npx serve` or any preferred static web server.
