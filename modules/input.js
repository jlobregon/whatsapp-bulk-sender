module.exports = prompt => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        try {
            readline.question(prompt, input => {
                resolve(input);
                readline.close();
            });
        } catch (error) {
            reject(error);
        }
    })
}