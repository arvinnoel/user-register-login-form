const bcrypt = require('bcryptjs');

const testPasswordHashing = async () => {
    const plainPassword = 'your-test-password'; // Replace with the test password
    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Generated Hash:', hashedPassword);

    // Check if hashing was consistent
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password match result:', isMatch); // Should print true
};

testPasswordHashing();
