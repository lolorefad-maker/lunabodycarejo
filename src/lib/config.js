// Shop settings — the only file the owner needs to touch.

// WhatsApp number that receives orders: international format, digits only (e.g. 9627XXXXXXXX).
// Left empty, WhatsApp opens and lets the customer pick the chat to send to.
export const WHATSAPP_NUMBER = ''

export const INSTAGRAM_URL = 'https://www.instagram.com/'

// Price of one gift set, in Jordanian dinars.
export const PRICE = 25

export const SCENTS = ['musk', 'fruity']

export const IMG = {
  box: { musk: '/img/box-musk.webp', fruity: '/img/box-fruity.webp' },
  set: { musk: '/img/set-musk.webp', fruity: '/img/set-fruity.webp' },
}

// Order of use inside the box
export const RITUAL = ['gel', 'scrub', 'lotion', 'butter', 'mist']

// Where each product sits in the set photos (% of width, % of height) — from scripts/build-images.py
export const SPOTS = {
  musk: { mist: [8.8, 33], lotion: [41.7, 34.1], gel: [89.2, 37.4], scrub: [64, 65.4], butter: [21.1, 72.7] },
  fruity: { mist: [8.1, 31.4], scrub: [20.6, 72.6], gel: [43.7, 38.9], butter: [65.8, 68.5], lotion: [89.5, 48.4] },
}

export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]
