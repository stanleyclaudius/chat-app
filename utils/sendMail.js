const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN
const MAIL_SENDER_EMAIL = process.env.MAIL_SENDER_ADDRESS

const sendMail = async(to, url, text) => {
  const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
  )
  oAuth2Client.setCredentials({refresh_token: MAIL_REFRESH_TOKEN})

  try {
    const accessToken = oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: MAIL_SENDER_EMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: MAIL_REFRESH_TOKEN,
        accessToken
      }
    })

    const options = {
      from: MAIL_SENDER_EMAIL,
      to,
      subject: `Inpace - ${text}`,
      html: `
        <div style="border: 5px solid #ccc; padding: 15px;">
          <h1 style="text-align: center;">Inspace ${text}</h1>
          <p>Please click below button to proceed the chosen action</p>
          <a style="display: block; text-decoration: none; background: orange; color: #fff; width: 130px; height: 35px; text-align: center; line-height: 35px; margin-top: 15px" href=${url}>Click Me</a>
          <div style="margin-top: 20px;">
            <p>Thank you for using <strong>Inspace</strong> for chatting with people around the world
            <p>Warm Regards,</p>
            <p>- Inspace Team -</p>
          </div>
        </div>
      `
    }

    const result = await transport.sendMail(options)
    return result
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = sendMail