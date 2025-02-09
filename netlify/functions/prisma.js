const { PrismaClient } = require('@prisma/client')

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${process.env.PRISMA_SQLITE_DB_PATH}`
      }
    }
  })
} else {
  prisma = new PrismaClient()
}

module.exports = prisma
