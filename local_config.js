module.exports = {
    jwt: {
        secret: '8nv5qmr,8tchtm6qr,xu7402 749xrhqmi,x7t'
    },

    pbkdf2: { // larger numbers mean better security
        hashBytes: 256, // size of the generated hash
        saltBytes: 128, // larger salt means hashed passwords are more resistant to rainbow table
        digest: 'sha512', //digest algorithm is applied to derive a key
        iterations: 40000 /* more iterations means an attacker has to take longer to brute force an
         individual password, so larger is better. however, larger also means longer
         to hash the password. tune so that hashing the password takes about 300ms */
    }
};