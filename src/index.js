import '@babel/polyfill/noConflict'
import server from './server'

server.start(server.opts, () => {
    console.log(`Server is running`)
})
