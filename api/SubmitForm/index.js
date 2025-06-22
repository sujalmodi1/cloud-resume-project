module.exports = async function (context, req) {
  const { name, email } = req.body;

  if (!name || !email) {
    context.res = {
      status: 400,
      body: "Please provide both name and email."
    };
    return;
  }

  context.res = {
    status: 200,
    body: `Thanks, ${name}! We'll contact you at ${email}.`
  };
};
