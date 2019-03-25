var QRCode = require('qrcode')

const qrGenerator = (url, route, serial) => {
  let qrDestination = url+route+serial
  QRCode.toFile(`qr/${serial}.png`, qrDestination, (err) => {
    if (err) throw err
    console.log(`${serial}.png created!` )
  })
  return `${qrDestination} created!`
}

module.exports = qrGenerator;
