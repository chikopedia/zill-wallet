const fs = require('fs-extra');
var readlineSync = require('readline-sync');
const {
    toBech32Address,
    getAddressFromPrivateKey,
  } = require('@zilliqa-js/crypto');
  const { generatePrivateKey } = require('@zilliqa-js/crypto/dist/schnorr');
  
(async () => {
    try {
        const jml = readlineSync.question('[?] Jumlah wallet: ')
        for(var i = 0 ; i < jml; i++){
            const getPk = generatePrivateKey()
            const getAddress = getAddressFromPrivateKey(getPk)
            console.log(`PK: ${getPk}\nAddress: ${toBech32Address(getAddress)}\n`)
            await fs.appendFile('address.txt', `${toBech32Address(getAddress)}|${getPk}`+'\r\n', err => {
                if (err) throw err;
            })
        }
    } catch (e) {
        console.log(`Error: ${e}\n`)
  }
})()