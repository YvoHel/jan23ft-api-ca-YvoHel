let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let initializeStatuses = require("./databaseInitializer");
let usersRouter = require("./routes/users");
let db = require("./models");
let app = express();

const authenticateToken = require("./middleware/middleware");
const todosRouter = require("./routes/todos");
const categoriesRoutes = require("./routes/categories");
const standardResponse = require('./middleware/standardResponse');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'Todo API Information'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(standardResponse);

app.get("/", (req, res) => {
	res.json({ message: "Hello, World!" });
});

app.use("/users", usersRouter);
app.use("/categories", categoriesRoutes);
app.use("/todos", todosRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render("error", {
        message: err.message,
        error: req.app.get("env") === "development" ? err : {}
    });
});

db.sequelize
	.sync()
	.then(async () => {
		const statusCount = await db.Status.count();

		if (statusCount === 0) {
			await db.Status.bulkCreate([
				{ status: "Not Started" },
				{ status: "Started" },
				{ status: "Completed" },
				{ status: "Deleted" },
			]);
			console.log("Statuses initialized successfully.");
		}

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

module.exports = app;
