# Wedding Invitation Website

A mobile-first animated wedding invitation website with:
- Opening invitation card animation
- Background music toggle
- Countdown timer
- Event schedule
- Family section
- Gallery placeholders
- Venue link
- WhatsApp RSVP
- Floating petal animation

## How to customize

1. Open `index.html` and replace:
   - Niharika & Tanishk
   - Wedding date
   - Event names, timings, venue details
   - Family names
   - Google Maps link
   - Hashtag

2. Open `script.js` and replace:
   - `weddingDate` with your exact wedding date/time
   - `whatsappNumber` with your number, including country code and no plus sign

3. Add music:
   - Put your MP3 file inside the `assets` folder
   - Rename it to `music.mp3`

4. Add photos:
   - Put images in `assets`
   - Replace gallery placeholder divs in `index.html` with image-backed divs, for example:

```html
<div class="photo" style="background-image:url('assets/photo1.jpg')"></div>
```

## How to run locally

Just open `index.html` in your browser.

## How to host

Upload the folder to Netlify, Vercel, or GitHub Pages.
