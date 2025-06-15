const { app } = require('@azure/functions');

app.http('SubmitForm', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`SubmitForm function processed a request.`);

        let body;
        try {
            body = await request.json();
        } catch (err) {
            return {
                status: 400,
                body: "Invalid JSON"
            };
        }

        const { name, email } = body;

        if (!name || !email) {
            return {
                status: 400,
                body: "Please provide both name and email."
            };
        }

        return {
            status: 200,
            body: `Thanks, ${name}! We'll contact you at ${email}.`
        };
    }
});
