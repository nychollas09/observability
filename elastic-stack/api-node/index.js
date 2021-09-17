const elasticApmAgent = require("elastic-apm-node");
const express = require("express");
const mongoose = require("mongoose");
const faker = require("faker");
const mongoLogger = require("./mongo.logger");
const { inspect } = require("util");

mongoose.Promise = global.Promise;

mongoose.Query.prototype.then = () => {
  throw new Error(`use exec() because requests cannot be tracked by APM Agent`);
};

elasticApmAgent.start({
  serviceName: "elastic",
  serverUrl: "http://localhost:8200",
  // logLevel: "trace",
});

const app = express();
app.use(express.json());

// mongoose.set("debug", (collectionName, method, ...args) => {
//   const msgMapper = (message) => {
//     return inspect(message, false, 10, true)
//       .replace(/\n/g, "")
//       .replace(/\s{2,}/g, " ");
//   };

//   const log =
//     `\x1B[0;36mMongoose:\x1B[0m: ${collectionName}.${method}` +
//     `(${args.map(msgMapper).join(", ")})`;

//   mongoLogger.log("info", log);
// });

mongoose.connect(
  "mongodb+srv://elastic:elastic@elasticcluster.ishcz.mongodb.net/resource?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
      elasticApmAgent.captureError(error);
      return;
    }

    console.log("Connected on Database!!!");
  }
);

const ResourceModel = require("./resource.schema");

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", request.get("origin") || "*");

  if (request.method === "OPTIONS") {
    return response.status(204).json();
  }

  next();

  // const apmSpan = elasticApmAgent.startSpan("Receiving Body");
  // const buffers = [];

  // request.on("data", (chunk) => {
  //   buffers.push(chunk);
  // });

  // request.on("end", () => {
  //   request.body = Buffer.concat(buffers).toString();

  //   if (apmSpan) apmSpan.end();

  //   next();
  // });
});

app.get("/", (_, response) => response.send("Elastic API"));

app.get("/register", async (_, response) => {
  const resource = await ResourceModel.create({
    name: faker.name.findName(),
    age: faker.datatype.number(100),
  });

  return response.json(resource.toObject());
});

app.get("/resource", async (_, response) => {
  return response.json(await ResourceModel.find({}).exec());
});

app.listen(3000, () => {
  console.log("Node Api is running on port 3000");
});
