const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cc9762a9c9a950",
          pass: "1a4b69490bbdfb"
        }
      
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};