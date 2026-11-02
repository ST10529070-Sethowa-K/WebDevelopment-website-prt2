
## Student Information
- **Full Name:** Koketso Sethowa
- **Student Number:** ST10529070
- **Module:** Web Design 502 (WEDE5020)
- **Institution:** The Independent Institute of Education (IIE)

## Project Overview
This repository contains the Portfolio of Evidence for WEDE5020. The project is a website built for **Gift of the Givers Foundation**. The site presents the organisation's history, mission, services and contact information, and provides visitors with an enquiry form for volunteering or sponsorship.

The project is being developed across three parts:
- **Part 1:** HTML structure, project planning, content research and initial website setup.
- **Part 2 (current):** CSS styling, visual design and responsive design.
- **Part 3:** JavaScript functionality, interactivity and SEO enhancements.

## Website Goals and Objectives
- Clearly communicate the organisation's mission, history and impact.
- Make it easy for visitors to enquire about volunteering and sponsorship.
- Provide a clear, readable and responsive experience on desktop, tablet and mobile devices.

## Website Structure
The website contains five core pages:
- `index.html` — Home page and impact overview.
- `about.html` — History, mission, vision and team information.
- `services.html` — Humanitarian services and project categories.
- `enquiry.html` — Volunteer and sponsor enquiry form.
- `contact.html` — Office information, maps and contact form.

## Part 2 — CSS Styling and Responsive Design
Part 2 focuses on improving the visual design and ensuring the website adapts to different screen sizes.

### External CSS stylesheet
A single external stylesheet, `CSS/style.css`, is linked to all five HTML pages. CSS custom properties are used for the main colour palette, spacing-related values and reusable design values.

### Visual styling
The site uses a consistent blue and orange colour scheme, readable typography, spacing, borders, rounded corners and subtle shadows. Buttons, navigation links, cards and form controls include hover and focus states.

### Layout
- **Flexbox** is used for the header/navigation and hero buttons.
- **CSS Grid** is used for the content cards and contact-office layout.
- Cards use reusable classes to demonstrate the cascading nature of CSS with a small number of selectors.

### Responsive design
The site includes breakpoints for:
- **Desktop:** above 900px.
- **Tablet:** 901px and below, including a two-column content layout.
- **Mobile:** 600px and below, using a single-column layout and vertically arranged navigation.
- **Small phones:** 400px and below, with additional typography adjustments.

Relative and flexible units such as `rem`, `%`, `min()`, `clamp()` and `vw` are used to help the layout scale between devices.

### Responsive images
Responsive image techniques are used for the home-page hero image with `<picture>`, `srcset` and `sizes`. Optimised logo image variants are also supplied for different display densities.

### Accessibility and usability
- All images have descriptive alternative text.
- Form fields use associated labels.
- Keyboard focus states are visible.
- Text contrast is maintained against the main backgrounds.
- A reduced-motion media query is included for users who prefer less animation.

## Testing Evidence
The Part 2 website should be checked using browser developer tools at different viewport sizes. Evidence to include with the submission:

| Device view | Suggested viewport | What to check |
|---|---:|---|
| Desktop | 1440 × 900 | Full navigation, three-column cards and hero layout |
| Tablet | 900 × 900 | Two-column content and readable navigation |
| Mobile | 390 × 844 | Single-column cards, stacked navigation and responsive hero |

### Screenshot evidence
Add screenshots from browser developer tools showing the website at desktop, tablet and mobile widths. These screenshots demonstrate that the layout and content adapt to different screen sizes.

## GitHub Repository
The repository should contain the updated HTML and CSS files, image assets, README and the Git history for Part 2.

## Changelog

### Part 2 — CSS Styling and Responsive Design
- Fixed the external stylesheet structure and CSS syntax.
- Removed inline styling from the HTML pages.
- Added a consistent CSS variable-based colour palette and reusable component styles.
- Improved typography, spacing, buttons, cards, forms and navigation states.
- Added Flexbox and CSS Grid layouts.
- Added desktop, tablet, mobile and small-phone breakpoints.
- Added responsive hero images using `<picture>`, `srcset` and `sizes`.
- Added responsive logo image variants.
- Added keyboard focus states and reduced-motion support.
- Added active navigation states to all five pages.
- Updated this README to document the Part 2 work and testing requirements.

## Part 1 Details
Part 1 established the foundation of the website:
- Semantic HTML across all five pages.
- Organised file structure (`CSS/`, `js/`, `images/`).
- Working internal navigation across the site.
- Enquiry and Contact forms prepared for client-side validation.
- Initial blue and orange visual styling.
- Project proposal and research/resource documentation.

## Sitemap
```text
Home (index.html)
├── About Us (about.html)
├── Services (services.html)
├── Enquiry (enquiry.html)
└── Contact (contact.html)
```
