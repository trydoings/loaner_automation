var QRCode = require('qrcode')

const generateQR = (url, route, serial) => {
  let qrDestination = route+serial
  console.log(url);
  QRCode.toFile(`qr/${serial}.png`, url, (err) => {
    if (err) throw err
    console.log(`${serial}.png created!` )
  })
  return `${qrDestination} created!`
}

module.exports = generateQR;
