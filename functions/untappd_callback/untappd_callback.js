const request = require("async-request");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code || "World";
    const client_id = process.env.UNTAPPD_CLIENT_ID;
    const client_secret = process.env.UNTAPPD_CLIENT_SECRET;
    const redirect_url = process.env.UNTAPPD_REDIRECT_URL;
    const auth_url = `https://untappd.com/oauth/authorize/?client_id=${client_id}&client_secret=${client_secret}&response_type=code&redirect_url=${redirect_url}&code=${code}`;

    let response_message = await request(auth_url);

    console.log(`response_message: ${JSON.stringify(response_message)}`)
    const body = response_message.body
    console.log(`body ${JSON.stringify(JSON.parse(body))}`)
    const response = JSON.parse(body).response
    console.log(`response: ${JSON.stringify(response)}`)
    const access_token = response.access_token
    console.log(`access_token: ${JSON.stringify(access_token)}`)

    return {
      statusCode: 200,
      body: access_token,
    };
  } catch (err) {
    console.log(`error: ${err}`)
    return { statusCode: 500, body: err.toString() };
  }
};
