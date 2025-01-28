const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    
    try {
        // Use await to ensure the query resolves before moving on
        const existingAdmin = await User.findOne({ email: "admin@test.com" });

        if (!existingAdmin) {
            // Create the new admin account
            const newAdmin = new User({
                email: "admin@test.com",
                name: "Admin",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
            })
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createAdminAccount;
