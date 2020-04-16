// const getTime = (date) => (~~(date.getTime() / 1000))
const express = require('express')
const config = require('plain-config')()
const cluster = require(`cluster`)
const numCores = config.cores || require(`os`).cpus().length
// const {v4} = require('uuid')
// const axios = require('axios')
const cors = require('cors')
const {getDataCache} = require('./redis')
const logger = require('bunyan-loader')(config.log).child({scope: 'server.js'})
const app = express()


if (cluster.isMaster) {
    logger.info(`Master pid:${process.pid} is running`);
    logger.info(`Using node ${process.version} in mode ${config.env} spawning ${numCores} processes, port ${config.port}`)

    for (let i = 0; i < numCores; i++) {
        cluster.fork()
    }

    cluster.on(`exit`, (worker, code, signal) => {
        logger.info(`worker  ${worker.process.pid} died `)
    })

} else {
    app.use(cors())

    app.get('/health', async (req, res, next) => {
        res.send('OK')
    })

    app.get('/signup', async (req, res, next) => {
        let conditions = await getConditions()
        res.send(conditions)
    })

    app.use(require('./middlewares/not-found'));

    app.use(require('./middlewares/error'));

    app.listen({port: config.port}, () => {
            console.log(`\n🚀\x1b[35m Server ready at http://localhost:${config.port}, worker pid:${process.pid} \x1b[0m \n`)
        }
    )
}

const getConditions = async () => {
    return await getDataCache(`targeting`)
}