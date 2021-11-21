const fs = require('fs');
const { Keypair } = require('@solana/web3.js');

const files = fs.readdirSync('./target/deploy')

console.log(files);

files.filter((file) => {
  return /keypair\.json$/.test(file)
}).forEach((file) => {
  console.log(file);
  const keystring = require(`./target/deploy/${file}`);

  const kp = Keypair.fromSecretKey(Uint8Array.from(keystring));
  console.log(kp.publicKey.toBase58());
})