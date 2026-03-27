import { H3, serve } from 'h3'

const app = new H3({
  onRequest(event) {
    event.res.headers.append('Access-Control-Allow-Origin', '*')
    event.res.headers.append('Access-Control-Allow-Methods', '*')
    event.res.headers.append('Access-Control-Allow-Headers', '*')
  },
})

app.get('/customer/:ssn', () => {
  return {
    name: 'Clark Kent',
    phonenumber: '98765432',
    email: 'test@example.com',
  }
})

app.head('/', () => 'server ready')

serve(app, { port: 3000 })
