require('dotenv').config();
const mongoose = require('mongoose');

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    const users = await db.collection('users').find({}).toArray();
    for (let u of users) {
        console.log(`User: ${u.email}, Password starts with $2a? ${u.password.startsWith('$2')}, Password length: ${u.password.length}`);
    }
    process.exit(0);
}
check();
