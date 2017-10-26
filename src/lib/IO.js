import IO from 'crocks/IO'

const printError = IO(console.error)
const print = IO(console.log)

export { print, printError }