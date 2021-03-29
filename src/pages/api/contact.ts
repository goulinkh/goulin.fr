import sgMail from '@sendgrid/mail';
import { NextApiHandler } from 'next';
import escapeHtml from 'src/utils/escapeHtml';

sgMail.setApiKey(process.env.EMAIL_API_KEY as string);

const Hello: NextApiHandler = async (req, res) => {
  // ReCAPTACH verification
  const { success, score } = await (
    await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_API_KEY}&response=${req.body.recaptchaToken}`,
      {
        method: 'POST',
      },
    )
  ).json();

  // Recaptcha validation
  if (!success || score < 0.5) {
    res.status(200).json({
      error: true,
      // Degage, on veut pas de bot ici
      message: 'Il faut utiliser un navigateur que vous utiliser courament',
    });
    return;
  }

  // Data validation
  if (!req.body.name?.trim()) {
    res.status(200).json({
      error: true,
      message: 'Vous avez oublié de saisir votre nom',
    });
    return;
  }
  if (!req.body.message?.trim()) {
    res.status(200).json({
      error: true,
      message: 'Votre message est vide',
    });
    return;
  }
  const email = (req.body.email as string) || '';
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    res.status(200).json({
      error: true,
      message: 'Votre addresse mail est invalide',
    });
    return;
  }

  // Send email
  try {
    await sgMail.send({
      to: 'goulin.khoge@gmail.com',
      from: 'contact@goulin.fr', // Use the email address or domain you verified above
      subject: 'Ecommerce demo contact form',
      html: `
<h1 style="color:rgb(73, 169, 230);">Goulin.fr Contact Form</h1>
<strong>Name: </strong><span>${req.body.name}</span>
<strong>Email: </strong><span>${email}</span>
<br/>
<br/>
<strong>Message:</strong>
<p>${escapeHtml(req.body.message).split('\n').join('<br/>')}</p>`,
    });
    res.status(200).json({ message: 'Votre message a été envoyé avec succes' });
  } catch (e) {
    console.error('Failed to send email', e.response.body.errors);
    res.status(200).json({
      error: true,
      message: "Echec d'envoie de mail",
    });
  }
};

export default Hello;
