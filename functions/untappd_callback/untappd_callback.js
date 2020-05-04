const request = require("request");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const code = event.queryStringParameters.code || "World";
    const client_id = process.env.UNTAPPD_CLIENT_ID;
    const client_secret = process.env.UNTAPPD_CLIENT_SECRET;
    const redirect_url = process.env.UNTAPPD_REDIRECT_URL;
    const auth_url = `https://untappd.com/oauth/authorize/?client_id=${client_id}&client_secret=${client_secret}&response_type=code&redirect_url=${redirect_url}&code=${code}`;

    let response_message = "default";

    response_message = await request(auth_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(`success: ${response}`);
        return response
      } else {
        console.log(`error: ${error}`);
        return error
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${JSON.stringify(response_message)}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
