const { json } = require("body-parser");
const express = require("express");
const app = express();
var morgan = require("morgan");

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(
  requestLogger,
  morgan(function (tokens, req, res) {
    console.log(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((persons) => persons.id === id);

  if (person) {
    response.send(person);
  } else {
    response.send("User is unavailable");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.send(persons);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (request.body.name && request.body.number) {
    if (!persons.find((person) => person.name === request.body.name)) {
      const person = {
        id: Number(
          (Math.random() * (100 - persons.length) + persons.length).toFixed(0)
        ),
        ...request.body,
      };
      console.log(person);
      persons = persons.concat(person);
      response.status(201).send(persons);
    } else {
      response.status(302).send({ error: "name has been used" });
    }
  } else {
    response.status(422).send({ error: "Lack of name or number" });
  }
});

app.get("/info", (request, response) => {
  const utcStr = new Date().toUTCString();

  response.send(`<div>
      <p>Phone book has ${persons.length} people</p>
      <p>${utcStr}</p>
    </div>`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
