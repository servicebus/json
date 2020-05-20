const jsonmiddleware = require('./index.js')

test('json passes through', () => {
  let jsonm = jsonmiddleware()
  const testmessage = { test: true }
  const cb = jest.fn((err, queue, message) => {
    expect(message).toBe(testmessage)
  })
  jsonm.handleOutgoing('test', testmessage, cb)
})

test('parses incoming json strings', () => {
  let jsonm = jsonmiddleware()
  const testmessage = {
    content: JSON.stringify({ test: true })
  }
  const cb = jest.fn((err, queue, message) => {
    expect(message.content).toEqual({ test: true })
  })
  jsonm.handleIncoming('test', testmessage, {}, cb)
})