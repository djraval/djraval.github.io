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
  var emailTemplate = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>DJRaval Web</title><style type="text/css"></style></head><body style="margin:0; padding:0; background-color:#F2F2F2;"><center><table border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2"><tr><td align="center" valign="top"> You just received a message from DJRaval Web.<hr><br><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2" ><tr><td><b>Name</b></td><td>'+name+'</td></tr><tr><td><b>Email</b></td><td>'+email+'</td></tr><tr><td><b>Message</b></td><td>'+message+'</td></tr><tr><td><b>Time</b></td><td>'+new Date(time)+'</td></tr></table></td></tr></table></center></body></html>';
  return emailTemplate;
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


