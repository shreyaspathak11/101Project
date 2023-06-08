const mongoose = require('mongoose');

const connectDB = () => {
mongoose.connect("mongodb+srv://dummy123:dummy123@bitbazaar.imeimd6.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then((con) => console.log(`Connected to MongoDB: ${con.connection.host}`))
.catch(err => console.log(err));
};

module.exports = connectDB;
