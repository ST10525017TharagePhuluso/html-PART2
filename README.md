# Burkleigh House Bakery - WEDE5020 POE Part 3

A responsive website for a family bakery in Ferndale, Randburg, Johannesburg. Visitors can browse cakes and breads, build an order summary, send a product enquiry with an instant price and availability response, and contact the bakery.

- **Live site:** https://ST10525017TharagePhuluso.github.io/burkleigh-house-bakery/
- **Repository:** https://github.com/ST10525017TharagePhuluso/burkleigh-house-bakery
- **Student number:** ST10525017

## Project structure
```
index.html        Shop, gallery, FAQ
enquiry.html      Enquiry form (price and availability response, AJAX)
contact.html      Contact form (compiled email) and Leaflet map
404.html          Friendly not-found page
css/styles.css    All styling (responsive, reduced-motion aware)
js/script.js      All behaviour (jQuery 3.7.1 + Leaflet 1.9.4)
images/           Local images with descriptive names (see Images)
robots.txt, sitemap.xml, _headers
```

## 2. Functionality
| Requirement | Where | How it works |
|---|---|---|
| Accordion | `index.html` FAQ | jQuery `slideDown`/`slideUp`; one panel open at a time; `aria-expanded` kept in sync |
| Modal | `index.html` | Click a product photo to open a `dialog` with price, lead time and an enquiry link; closes with Close, Esc or a click outside |
| Interactive map | `contact.html` | Leaflet + OpenStreetMap tiles, zoomable, marker with popup for the bakery |
| Animations/transitions | all pages | CSS page-load rise on the hero heading, hover lift on buttons and gallery photos, jQuery slide on the accordion; disabled when the user prefers reduced motion |
| Advanced DOM manipulation | `js/script.js` | Product cards, order summary, gallery, enquiry options, results and error messages are created and updated with jQuery DOM methods |
| Gallery with lightbox | `index.html` | Click any gallery photo for a larger view with caption, Previous/Next buttons, arrow-key navigation, Esc to close |
| Dynamic content | `index.html` | Product listings are generated from a JavaScript data array |
| Search, filter, sort | `index.html` | Live text search, category filter, and sort by name or price; shows a message when nothing matches |

## 3. Search Engine Optimisation
- **Keyword research:** target phrases are "bakery Randburg", "custom cakes Johannesburg", "sourdough Ferndale" and "fresh bread". They appear in titles, headings, descriptions and body text.
- **Title tags and meta descriptions:** unique for every page.
- **Meta keywords:** present on every page (search engines largely ignore them, but they are included to meet the brief).
- **Headings:** one `h1` per page, then `h2` and `h3` in order.
- **Images:** descriptive file names (for example `chocolate-fudge-cake.svg`) and specific alt text on every image.
- **URLs and internal linking:** short lowercase URLs; header and footer link every page; product modal links to the enquiry page.
- **Mobile-friendly:** viewport tag and a responsive layout that stacks below 800px.
- **Off-page and local SEO:** Open Graph tags, `Bakery` structured data (JSON-LD) with address and opening hours, and a map with the Ferndale, Randburg location. Backlink and social media plan: list the bakery on Google Business Profile, local Randburg directories and Facebook/Instagram, linking back to the live site.
- **robots.txt and sitemap.xml:** included, with the sitemap referenced from robots.txt.
- **Page speed:** local lightweight SVG images with width/height set, lazy loading, two small own files, deferred third-party libraries at the end of the body, one font request with `display=swap`.
- **Security:** Content-Security-Policy and referrer policy in every page, `_headers` (Netlify) for frame, content-type and permissions protection, all user text written with `.text()`, validated input, no secrets in the code.

## 4. Forms
- **Enquiry form (`enquiry.html`):** name, email, phone, product, quantity, date, collection or delivery. After validation it returns the cost (including the R60 delivery fee) and availability (2 days notice for cakes, 1 day for breads, closed Sundays), and submits with `$.ajax`.
- **Contact form (`contact.html`):** name, email, phone, message type and message. After validation it compiles an email, shows a preview and opens it addressed to the recipient set in the code.
- **Validation:** HTML5 attributes plus JavaScript: letters-only names, email format, South African phone numbers (`082 123 4567` or `+27...`), future dates, no Sundays, quantity 1-20, message 10-1000 characters. Errors appear under each field with `role="alert"` and the field is marked `aria-invalid`.

## Images
Real photos are stored locally in `images/` with descriptive file names (for example `chocolate-fudge-cake.jpg`). Run `download-images.ps1` (Windows) or `download-images.sh` once to download them from Unsplash, then commit the `images/` folder to GitHub. If a photo is missing, the site automatically shows the matching illustration (`.svg`) instead, so nothing breaks. Replace any photo with your own by saving it under the same name.

## Setup and deployment
1. Username and student number are already filled in (`ST10525017TharagePhuluso` / `ST10525017`).
2. Create a free [Formspree](https://formspree.io) form and replace `YOUR_FORM_ID` in `enquiry.html` with your real form ID.
3. Replace `orders@YOUR-DOMAIN.co.za` in `contact.html` with the email address you want enquiries sent to.
4. Commit the work in stages with descriptive messages (see "Suggested commit sequence" below) and `git push`.
5. Deploy: GitHub Pages (Settings > Pages > Deploy from branch `main`, root) or Netlify (drag-and-drop the folder, or connect the repository). If you deploy to Netlify, update the live-site URL in `README.md`, `sitemap.xml`, `robots.txt` and the `<link rel="canonical">` tag on every page, since those currently point at GitHub Pages.
6. Open every page on the **live** link (not just localhost) and work through the testing checklist below before submitting.

## Suggested commit sequence
Marks are given for *multiple, descriptive* commits, not one big upload. If you are starting from a clean checkout of this folder, stage and commit in roughly this order:
```
git add css/ index.html
git commit -m "Part 3: rebuild layout with semantic HTML and responsive CSS"

git add js/script.js index.html
git commit -m "Part 3: add dynamic product listing with search, filter and sort"

git add index.html js/script.js
git commit -m "Part 3: add gallery with lightbox and FAQ accordion"

git add contact.html js/script.js
git commit -m "Part 3: add Leaflet interactive map and contact form"

git add enquiry.html js/script.js
git commit -m "Part 3: add enquiry form with price/availability response"

git add index.html contact.html enquiry.html robots.txt sitemap.xml
git commit -m "Part 3: add SEO metadata, sitemap and robots.txt"

git add _headers 404.html
git commit -m "Part 3: add security headers and 404 page"

git add README.md
git commit -m "Part 3: update README with changelog and references"

git push
```
Adjust messages/order to match what you actually changed if you edit things further — a commit history that doesn't match your real changes can look worse than one or two honest commits.

## Testing checklist
- [ ] Search "cake", then "bread", then a nonsense word (message appears)
- [ ] Filter and sort return the right products
- [ ] Add, remove and total in the order summary
- [ ] Modal opens and closes (button, Esc, outside click)
- [ ] Lightbox Previous/Next and arrow keys
- [ ] Accordion opens one panel at a time
- [ ] Enquiry: valid and invalid input, a Sunday, a date too soon
- [ ] Contact: errors show, then the email preview and Send email link
- [ ] Map loads and marker popup opens
- [ ] Works on a phone-width screen
- [ ] Live site: all pages load without errors

## Changelog
### Feedback from Part 2
Add one row per point from your lecturer's feedback, in this format. The rows below are the improvements already made to the Part 2 page.

| Date | File | Feedback / reason | Change made |
|---|---|---|---|
| 2026-10-28 | all pages | Layout built with tables and `<font>` tags | Rebuilt with semantic HTML (`header`, `nav`, `main`, `section`, `footer`) and one shared `css/styles.css` |
| 2026-10-28 | all pages | Navigation must keep the three Part 2 options | Navigation is Menu, Order Cart and Contact Us, linking to the product list, order summary and contact page; the enquiry page is reached from the order summary, product pop-up and footer |
| 2026-10-28 | all pages | Page not usable on phones | Added a responsive grid and flexible layout |
| 2026-10-28 | index.html, css | Hero text hard to read over the photo | Added a dark overlay on the hero background |
| 2026-10-28 | index.html, js | Baguette and loaf shared the same image | Every product now has its own image |
| 2026-10-28 | index.html, js | Cart added the same item as separate lines | Cart groups items with quantities and a Remove button |
| 2026-10-28 | index.html, js | Order form did not capture or process data | Replaced with a validated enquiry form that returns cost and availability |
| 2026-10-28 | all pages | Buttons had no styling or focus state | Added button, focus and hover styles |

### New in Part 3
| Date | File | Change |
|---|---|---|
| 2026-10-28 | js/script.js | Added dynamic product listing with search, category filter and sorting |
| 2026-10-28 | index.html | Added jQuery accordion FAQ and product modal |
| 2026-10-28 | index.html, js | Added gallery with lightbox, captions, Previous/Next and keyboard navigation |
| 2026-10-28 | contact.html | Added Leaflet map, validated form and compiled email |
| 2026-10-28 | enquiry.html | Added validated enquiry form, cost/availability response and AJAX submission |
| 2026-10-28 | all pages | Added unique titles, meta descriptions and keywords, canonical links, Open Graph tags and structured data |
| 2026-10-28 | images/, js, css | Switched to real photos with an automatic illustration fallback and a download script |
| 2026-10-28 | images/ | Added local images with descriptive file names and alt text; removed external image links |
| 2026-10-28 | robots.txt, sitemap.xml | Created crawler instructions and sitemap |
| 2026-10-28 | all pages, _headers | Added Content-Security-Policy, referrer policy and security headers |
| 2026-10-28 | 404.html | Added not-found page |

## References
Format: Harvard (adjust to your institution's guide if different).
- Google (2026) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 28 October 2026).
- jQuery Foundation (2024) *jQuery 3.7.1 documentation*. Available at: https://api.jquery.com (Accessed: 28 October 2026).
- Leaflet (2023) *Leaflet 1.9.4 documentation*. Available at: https://leafletjs.com/reference.html (Accessed: 28 October 2026).
- Mozilla (2026) *HTML dialog element*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog (Accessed: 28 October 2026).
- Mozilla (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 28 October 2026).
- OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 28 October 2026).
- Formspree (2026) *Formspree documentation*. Available at: https://help.formspree.io (Accessed: 28 October 2026).
- Netlify (2026) *Custom headers*. Available at: https://docs.netlify.com/manage/routing/headers (Accessed: 28 October 2026).
