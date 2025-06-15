const { app } = require('@azure/functions');

app.http('SubmitForm', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const body = await request.json();
    const name = body.name || "Guest";
    const email = body.email || "unknown@example.com";

    return {
      headers: { "Content-Type": "text/plain" },
      body: `Thanks, ${name}! We'll contact you at ${email}.`
    };
  }
});
