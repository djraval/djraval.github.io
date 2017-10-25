const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const APP_NAME = 'DJRaval Web';
const notif_address = 'devarshi.j.raval@gmail.com';

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

exports.contactMe = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var data_name = request.body.name;
        var data_email = request.body.email;
        var data_message = request.body.msg;
        var data_timestamp = new Date().getTime();
        
        sendEmail('devarshi.j.raval@gmail.com',
        'New Message on DJRaval Web',
        mailBody(data_name,data_email,data_message,data_timestamp)
      );
        
      response.status(200).send('{"result": true,"message": "#","alert": "I Got your message, will get back to you soon."}');
    }); 
});

function mailBody(name,email,message,time){
  var emailTemplate = '';

  var body = "You just received a message from DJRaval Web.";
  body = body+"<hr>Name:<br>"+name+"<hr>Email:<br>"+email+"<hr>Message:<br>"+message+"<hr>Time:<br>"+new Date(time);
  return body;
}

function pushToDB(name,email,message){

}

function sendEmail(sendTo,emailSubject,emailBody) {
    const mailOptions = {
      from: `${APP_NAME} <devarshi.j.raval@gmail.com>`,
      to: `${sendTo}`
    };
    mailOptions.subject = `${emailSubject}!`;
    mailOptions.text = `${emailBody}`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Notification email sent:');
    });
  }


