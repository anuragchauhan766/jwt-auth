import { createTransport, SendMailOptions } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
  TemplateOptions,
} from "nodemailer-express-handlebars";
import path from "path";

export const sendMail = async (
  to?: string,
  url?: string,
  name?: string,
  subject?: string,
  template?: string
) => {
  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.SEND_IN_BLUE_USERNAME,
      pass: process.env.SEND_IN_BLUE_PASSWORD,
    },
  });

  // using custom email template with nodemailer express handler
  const handlebarsOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false as unknown as string,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions: SendMailOptions & TemplateOptions = {
    from: {
      name: "JWT Auth",
      address: process.env.NODEMAIL_EMAIL_FROM as string,
    },
    to: to,
    subject: subject,
    template: template,
    context: {
      name,
      url,
    },
  };

  return await transporter.sendMail(mailOptions);
};
