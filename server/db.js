const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGO || "mongodb://localhost:27017/mini-chat",
    { useNewUrlParser: true }
  );


const db = mongoose.connection;

const handleError = () => console.log(`❌ Error Conneting to the Database `);
const handleOpen = () => console.log(`✅ Conneted to the DB`);
db.on("error", handleError);
db.once("open", handleOpen);