# LUNA Body Care

موقع مجموعات لونا للعناية بالجسم — بيور مسك وسويتي فروتي — بالعربي والإنجليزي، مع سلة وطلب عبر واتساب.

The LUNA Body Care website: two gift sets (Pure Musk, Sweetie Fruity), Arabic and English, a bag, and ordering through WhatsApp.

## Shop settings

Everything the owner changes lives in [`src/lib/config.js`](src/lib/config.js):

- `WHATSAPP_NUMBER` — the number that receives orders, international format, digits only (e.g. `9627XXXXXXXX`). While it is empty, WhatsApp opens and the customer picks the chat.
- `INSTAGRAM_URL` — the brand's Instagram link.
- `PRICE` — price of one set, in Jordanian dinars.

All the words on the site, in both languages, are in [`src/lib/content.js`](src/lib/content.js).

## Run

```bash
npm install
npm run dev      # http://localhost:5280
npm run build    # production files in dist/
```

## Deploy

Build command `npm run build`, output folder `dist`. `public/_redirects` (Netlify) and `vercel.json` (Vercel) send every path to `index.html`, so `/about` works when opened directly.

## Images

`public/img` is generated from the original product photos by `scripts/cutout.py` (background removal with rembg) and `scripts/build-images.py`.
