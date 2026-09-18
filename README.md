# Burkleigh House Bakery — Website (Part 2)

A responsive e-commerce style landing page for a fictional bakery in Ferndale, Randburg. Built with hand-written HTML5, external CSS (no framework), and vanilla JavaScript for product filtering and a shopping cart.

## File Structure

```
burkleigh-house-bakery/
├── index.html
├── style.css
├── script.js
├── screenshots/
│   ├── desktop.png
│   ├── tablet.png
│   └── mobile.png
└── README.md
```

## Features

- Product catalogue rendered dynamically from a JavaScript data array
- Category filtering (All / Cakes / Breads)
- Shopping cart with add/remove and live quantity + total updates
- Checkout form with client-side required-field validation
- Fully responsive: single-column phone layout, stacked tablet layout, two-column desktop layout

## Part 2 Overview — CSS Styling and Responsive Design

Part 2 builds on the Part 1 HTML structure by adding a full external CSS stylesheet and making the site responsive for mobile and tablet devices.

**What was implemented:**

- An external stylesheet (`style.css`) linked from `index.html` via `<link rel="stylesheet" href="style.css">`.
- A CSS reset (`*`, `*::before`, `*::after`) to normalise margin, padding, and box-sizing across browsers.
- A base style layer using CSS custom properties (`:root` variables) for colour scheme, typography, and spacing — so the whole site can be restyled from a small number of central values, taking advantage of the cascade with a minimum number of selectors.
- A typographic scale (heading font vs. body font, font-size variables) replacing the old inline `<font>` tag styling from Part 1.
- Layout styling for the header, hero section, shop layout (product grid + order panel), and footer, using flexbox/grid rather than the original table-based layout attributes.
- Component styling for product cards, filter buttons (`.filter-btn` / `.filter-btn.active`), add/remove buttons, the order/cart panel, and form inputs.
- Responsive design using relative units (`rem`, `%`, flex/grid) and two breakpoints:
  - `max-width: 768px` — tablet layout (shop layout stacks vertically, hero padding reduced)
  - `max-width: 480px` — mobile layout (single-column product grid, header stacks, smaller headings)

## Responsive Design / Testing Screenshots

**Desktop (≥769px)**

![Desktop view](./images%20of%20website/laptop.jpeg)

**Tablet (481–768px)**

![Tablet view](./images%20of%20website/tablet.jpeg)

**Mobile (≤480px)**

![Mobile view](./images%20of%20website/phone.jpeg)



## Changelog

### Part 2 — CSS Styling and Responsive Design

- **Added:** External stylesheet `style.css`, linked from `index.html`.
- **Added:** CSS reset and base style rules (colour scheme, typography, spacing variables in `:root`).
- **Added:** Typographic scale and layout styles (header, hero, shop layout, footer) using flexbox/grid.
- **Added:** Component styles for product cards, filter buttons, add/remove buttons, order panel, and form inputs — matching class names already used in the site's JavaScript.
- **Added:** Responsive breakpoints at 768px (tablet) and 480px (mobile) using relative units.
- **Added:** Responsive design testing screenshots (desktop/tablet/mobile) to this README.
- **Changed:** Replaced `bgcolor`, `background`, and `<font>` attributes in `index.html` with CSS classes from `style.css`.
- *(Add further entries here each time you commit a change, e.g. "Fixed cart total alignment on mobile" or "Adjusted product card spacing after peer review.")*

### Changes Made Based on Part 1 Feedback

- *(List each Part 1 correction here as you make it — be specific, e.g.: "Added missing `alt` text to all product images per feedback item 3." / "Corrected heading hierarchy — page now has a single `<h1>`.")*

### Part 1 — Structure and Content (original submission)

- Initial HTML structure for homepage, product menu, order/cart panel, and footer.
- Product data and cart logic implemented in JavaScript (add to cart, remove from cart, category filter, checkout).

## References

*(Add Harvard-style references for any external resources, tutorials, or documentation consulted, e.g.:)*

- MDN Web Docs (n.d.) *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: [date]).


## Author

phuluso — WEDE5020, IIE
