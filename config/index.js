module.exports = {
    DB: {
        uri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/workshop',
        options: {useNewUrlParser: true, useUnifiedTopology:true },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || true
    },
    PORT:process.env.PORT || 3000
}
