
export default function() {
    if (!process.env.JWT_KEY) {
        console.log('FATAL ERROR: jwt private key is not defined.');
        process.exit(1);
    }
}
