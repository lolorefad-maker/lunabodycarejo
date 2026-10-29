import { PRICE, SCENTS, WHATSAPP_NUMBER } from './config.js'

export function orderMessage(t, items, details) {
  const money = (n) => `${n} ${t.currency}`
  const lines = [t.wa.hello, '']
  for (const s of SCENTS) {
    if (!items[s]) continue
    lines.push(`• ${t.wa.set} ${t.scents[s].name} × ${items[s]} — ${money(items[s] * PRICE)}`)
  }
  lines.push(t.wa.giftNote, '')
  const total = SCENTS.reduce((n, s) => n + items[s], 0) * PRICE
  lines.push(`${t.wa.total}: ${money(total)}`, '')
  lines.push(`${t.wa.name}: ${details.name.trim()}`)
  lines.push(`${t.wa.phone}: ${details.phone.trim()}`)
  lines.push(`${t.wa.city}: ${details.city.trim()}`)
  lines.push(`${t.wa.address}: ${details.address.trim()}`)
  if (details.notes.trim()) lines.push(`${t.wa.notes}: ${details.notes.trim()}`)
  return lines.join('\n')
}

export function whatsappLink(text) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

export function whatsappChat() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}`
}
