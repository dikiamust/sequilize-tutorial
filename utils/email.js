const swig = require("swig");
const nodemailer = require("nodemailer");
const memoize = require("memoizee");
const htmlToText = require("html-to-text");

const mailerOptions = {
  host: process.env.MAILER_SERVICE_PROVIDER || "smtp.sendgrid.net",
  port: 587,
  debug: true,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL_ID,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
function createTransport(options) {
  return nodemailer.createTransport(mailerOptions);
}

const memoizeTransport = memoize(createTransport);

//send email with nodemailer
exports.sendEmail = async function (template, data, mailOptions) {
  return new Promise(function (resolve, reject) {
    const smtpTransport = memoizeTransport(mailerOptions);

    //set to html
    let tpl = swig.compileFile(template);
    let emailHTML = tpl(data);
    mailOptions.html = emailHTML;

    let txt = htmlToText.fromString(emailHTML, { wordwrap: 130 });
    mailOptions.text = txt;

    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
        if (err.responseCode === 451) {
          console.log("Maximum credit exceeded");
          resolve("Maximum credits exceeded");
        } else {
          reject(err);
        }
      } else {
        console.log("Email has been send to " + mailOptions.to);
        resolve("Email has been send");
      }
    });
  });
};
