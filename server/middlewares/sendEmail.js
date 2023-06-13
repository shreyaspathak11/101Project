const nodeMailer = require("nodemailer");           //import nodemailer for sending email

exports.sendEmail = async (options) => {              //export send email function

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

        // Using MAILTRAP for sending email

    const transport = nodeMailer.createTransport({              //create transport for sending email
        host: "sandbox.smtp.mailtrap.io",                   //host of email from where email is sent
        port: 2525,                                       
        auth: {                                           //authentication of email from mailtrap
          user: "cc9762a9c9a950",
          pass: "1a4b69490bbdfb"
        }
      
  });

  const mailOptions = {                                 //mail options for sending email
    from: process.env.SMPT_MAIL,                      //from email            
    to: options.email,                             //to email                   
    subject: options.subject,                     //subject of email
    text: options.message,                        //message of email from controller
  };

  await transport.sendMail(mailOptions);            //send email using transport
};
