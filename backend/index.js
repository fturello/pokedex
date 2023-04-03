const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
	err
		? console.error(`Something bad happened ${err}`)
		: console.log(`Server is listening on port ${port}`);
});
