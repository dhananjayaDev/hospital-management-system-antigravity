require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('./src/models');

const seed = async () => {
    try {
        await sequelize.sync({ force: false });

        // Check if admin exists
        const adminExists = await User.findOne({ where: { role: 'ADMIN' } });
        if (adminExists) {
            console.log('Admin already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'System Admin',
            email: 'admin@hms.com',
            password_hash: hashedPassword,
            role: 'ADMIN',
        });

        console.log('Admin created: admin@hms.com / admin123');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        process.exit();
    }
};

seed();
