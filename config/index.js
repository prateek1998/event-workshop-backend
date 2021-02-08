module.exports = {
    DB: {
        uri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : "mongodb+srv://prateekdb:tU6Ysk13JZUhBdOW@cluster0.bbfvl.mongodb.net/workshops?retryWrites=true&w=majority",//'mongodb://localhost/workshop',
        options: {useNewUrlParser: true, useUnifiedTopology:true },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    PORT:process.env.PORT || 5000
}
