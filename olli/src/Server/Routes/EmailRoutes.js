const express = require('express');
require('dotenv').config();
const userDB = require("../Database/UsersDB.js")
const auth = require("../Helpers/JwtAuth.js")
const router = express.Router();
const jwt = require('jsonwebtoken');
router.use(express.json());
const fs = require('fs')
const nodemailer = require('nodemailer');







const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../../src/assets/Newsletters")
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage })



router.get('/verify/:email', async (req, res) => {
    const email = req.params.email;
    console.log(email + " is Verified Now")
    // Update user status to "verified"
    try {

        await userDB.updateVerification(email);
    }
    catch (err) {
        console.log(`Error in verify route: ${err}`);
        res.status(401).json({ error: 'User Cannot Be Verified' })
        return
    }
    res.json({ message: 'Email verified successfully.' });
});

router.post('/createFile', auth, upload.single("file"), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.json()
})


router.post('/sendNewsLetter', auth, async (req, res) => {
    const subscriberEmails = await userDB.getSubscribedEmails()
    const emailAddresses = subscriberEmails.map(obj => obj.email);

    const name = req.body.path






    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pykelol5437@gmail.com',
            pass: 'nmcm ufcb rbvu jbhq',
        },

    });


    const mailOptions = {
        from: 'pykelol5437@gmail.com',
        to: emailAddresses.join(', '),
        subject: 'Olli News',
        html: 'Embedded image: <img src="cid:olli" />',

        attachments: [{
            filename: name,
            path: "../../src/assets/Newsletters/" + name,
            cid: 'olli' //same cid value as in the html img src
        }]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    res.json()

})

function getBase64EncodedPDF(pdfFilePath) {
    const pdfContent = fs.readFileSync(pdfFilePath, { encoding: 'base64' });
    return pdfContent;
}

module.exports = router