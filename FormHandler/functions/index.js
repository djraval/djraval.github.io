const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const APP_NAME = 'DJRaval Web';
const notif_address = 'devarshi.j.raval@gmail.com';

exports.contactMe = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var data = request.body.name +'<hr>'+request.body.email+'<hr>'+request.body.msg+'<hr>';
        //notifywithEmail("New Test"); 
        response.send(data);
    }); 
});

function notifywithEmail(emailBody) {
    const mailOptions = {
      from: `${APP_NAME} <mail@djraval.github.io>`,
      to: `${notif_address}`
    };
    mailOptions.subject = `New Message on ${APP_NAME}!`;
    mailOptions.text = `${emailBody}`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Notification email sent:');
    });
  }


