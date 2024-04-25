const nodemailer = require('nodemailer');
const fs = require('fs');
const readline = require('readline');


const emailToSendFile = './text.txt';
const fileContent = fs.readFileSync(emailToSendFile, 'utf8');

const sets = fileContent.split(/\r?\n\r?\n/);

const afterAth = () => {
    for (let i = 0; i < sets.length; i++) {
        const set = sets[i];
        console.log('Set:', set);
    
        const lines = set.trim().split(/\r?\n/);
        console.log('Lines:', lines);
    
        const senderName = lines[0].trim();
        console.log('Sender Name:', senderName);
    
        const receiverInfo = lines[1].trim().split(/\s+/);
        const receiverName = receiverInfo.slice(0, -1).join(' ');
        const receiverEmail = receiverInfo.slice(-1)[0];
        console.log('Receiver Name:', receiverName);
        console.log('Receiver Email:', receiverEmail);
        console.log('Processing set', i + 1);
    };
};


const transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
    }
});


const mailOption = {
    from: '',
    to: '',
    subject: '',
    text: ''
};


const generateKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 8; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return key;
};


const verifyKey = (key) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        const askForVerificationKey = () => {
            rl.question('Please enter the verification key sent to your email: ', (enteredKey) => {
                if (enteredKey === key) {
                    console.log('Key verified. Proceeding with the script...');
                    rl.close();
                    resolve(true);
                } else {
                    console.log('Invalid key. Please try again.');
                    askForVerificationKey();
                }
            });
        };

        askForVerificationKey(); 
    });
};


function sendEmails(){
    transporter.sendMail({

    });
};


const start = async () => {
    const key =  generateKey();
    console.log(key);
    const isVerified = await verifyKey(key);
    if(isVerified) {
        afterAth();
    }
};


start();