import { H3, serve } from 'h3'
import { setTimeout as sleep } from 'node:timers/promises'

const app = new H3({
  onRequest(event) {
    event.res.headers.append('Access-Control-Allow-Origin', '*')
    event.res.headers.append('Access-Control-Allow-Methods', '*')
    event.res.headers.append('Access-Control-Allow-Headers', '*')
  },
})

app.get('/customer/:ssn', async () => {
  await sleep(1_000)
  return {
    name: 'Alex Good',
    age: 30,
    phonenumber: '98765432',
    email: 'test@example.com',
  }
})

app.get('/vehicle/:registrationNumber', async () => {
  await sleep(1_000)
  return {
    description: 'Skoda Enyaq 85X',
    year: 2024,
  }
})

app.post('/coverages', async () => {
  await sleep(2_000)
  return [
    {
      id: 'kasko-pluss',
      name: 'Kasko pluss',
      price: 699,
      description:
        'Our most comprehensive coverage. Includes all damages to your vehicle, glass, roadside assistance, and rental car.',
    },
    {
      id: 'kasko',
      name: 'Kasko',
      price: 499,
      description:
        'Full coverage for damages to your own vehicle in addition to mandatory third-party liability.',
    },
    {
      id: 'delkasko',
      name: 'Delkasko',
      price: 299,
      description:
        'Covers fire, theft, glass damage, and third-party liability. Does not cover collision damage to your own vehicle.',
    },
    {
      id: 'ansvar',
      name: 'Ansvar',
      price: 149,
      description:
        'Mandatory minimum coverage. Covers damage and injuries you cause to others — not your own vehicle.',
    },
  ]
})

app.head('/', () => 'server ready')

serve(app, { port: 3000 })
