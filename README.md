# Pulsedesk – SaaS Landing Page

A responsive landing page for **Pulsedesk**, an invented SaaS product: a shared inbox that brings
email, live chat and social messages into one place for customer-support teams.
Built for the Sankar Group Front-End Development internship assignment.

**Live site:** _add your Netlify/Vercel link here_

## Sections
- Navigation bar (logo, links, Get Started button, mobile menu)
- Hero (headline, description, CTAs, product mock-up)
- Features (6 cards with icons)
- How it works (3 steps)
- Pricing (3 plans, monthly / yearly toggle)
- Contact – demo request form with validation and success message
- Footer

## Interactions
- Nav links and buttons scroll smoothly to their sections; the current section is highlighted in the nav.
- Mobile hamburger menu opens full-screen and closes on link tap or Esc.
- Pricing toggle switches between monthly and yearly prices.
- "Choose Starter / Growth / Talk to sales" pre-selects that plan in the demo form.
- Demo form: required name, valid email and team size; inline error messages; success message on submit (no backend).
- Back-to-top button appears after scrolling.

## Technologies
HTML5, CSS3 (custom properties, Grid, Flexbox, media queries) and vanilla JavaScript. No frameworks or build step.
Font: Inter (Google Fonts).

## Run locally
No installation needed.
1. Download or clone this folder.
2. Open `index.html` in a browser.
   (Optional: `python3 -m http.server` in this folder, then visit http://localhost:8000)

## Project structure
```
index.html   – page markup
style.css    – all styles (tokens, components, responsive rules)
script.js    – menu, scroll-spy, pricing toggle, form validation
screenshots/ – desktop and mobile screenshots
```

## Design choices and challenges
- A calm teal and near-black palette with generous spacing keeps the page clean and trustworthy for a business tool.
- Spacing, radius and colours come from CSS variables, so every section looks consistent.
- The hero product mock-up is built with HTML/CSS instead of an image, so it stays sharp and loads fast.
- The layout is fluid with three breakpoints (1024, 820, 640px); it was tested from 320px to 1440px with no horizontal scroll.
- The sticky navbar needed `scroll-padding-top` so section titles are not hidden behind it after a click.
- The form validates on blur and on submit, moves focus to the first error, and shows a friendly success state.
- Accessibility: semantic landmarks, a skip link, labelled inputs, aria-live errors and visible focus styles.
