import Email from 'email-templates';
import fs from 'fs';
import config from '../config';

export default class EmailService {
    constructor() {}

    async SendSignUpMail(user) {

        const email = new Email({
            message: {
              from: config.email.defaultSender,
              to: user.email,
              bcc: config.email.defaultBcc,
            },
            preview: false,
            send: true,
            transport: {
              host: config.email.host,
              port: config.email.port,
              auth: {
                user: config.email.login,
                pass: config.email.pwd
              }
            }
          });
    
          email.send({
              template: 'signup',
              locals: {
                name: user.name.split(" ")[0],
              },
            })
            .then()
            .catch(console.error);
    
          fs.appendFile('logs/auth/signups.txt', `${new Date().toISOString()}: [${user.name}] Signed Up \n`, function (err) {
            if (err) throw err;
          });
    };
};