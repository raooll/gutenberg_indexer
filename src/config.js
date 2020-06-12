module.exports = {
    DB_CONFIG: {
        HOST    : 'localhost',
        USERNAME: 'raooll',
        PASSWORD: '',
        DATABASE: 'books_db',
        dialect : 'postgres',
        pool: {
            max: 3,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    },
    PROMISE_CONCURRENCY : 50, // to control the number of concurrent processing.
}