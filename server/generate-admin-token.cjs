const crypto = require("crypto");

const secret = "asdfghjklpoiuy"; 
const today = new Date().toISOString().split('T')[0];
const token = crypto.createHash("sha256").update(secret + today).digest("hex");

console.log("Admin Login Token for today:", token);

