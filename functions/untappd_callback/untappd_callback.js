// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code || 'World'
    const client_id = process.env.UNTAPPD_CLIENT_ID
    const client_secret = process.env.UNTAPPD_CLIENT_SECRET
    const redirect_url = process.env.UNTAPPD_REDIRECT_URL
    const auth_url = `https://untappd.com/oauth/authorize/?client_id=${client_id}&client_secret=${client_secret}&response_type=code&redirect_url=${redirect_url}&code=${code}`

    return {
      statusCode: 301,
      location: auth_url
      // body: JSON.stringify({ message: `${auth_url}` })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,

      // {"meta":{"http_code":200},"response":{"access_token":"DFC11DF925CA3630423928CDCCBBE6583E2183A2"}}
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
