const { geoFire } = require('./database/firebase.js')

const geoQuery = geoFire.query({
  center: [40.7052066, -74.01032889999999],
  radius: 0.1
})

geoQuery.on('ready', function(...args) {
  console.log('ready!!', ...args)
})

geoQuery.on('key_entered', function(...args) {
  console.log('key entered!!', ...args)
})

geoQuery.on('key_exited', function(...args) {
  console.log('key exited!!', ...args)
})

setTimeout(() => geoQuery.updateCriteria({
  center: [-50.83, 100.19],
  radius: 5
}), 200)
