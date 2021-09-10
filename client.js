const PROTO_PATH = __dirname + "/main.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).main;

// Client
const target = "localhost:50051";
const client = new proto.Calculator(target, grpc.credentials.createInsecure());

// Calls
client.add({ someDigit: 166 }, (err, res) => {
  console.log(res);
});

client.subtract({ someDigit: 167 }, (err, res) => {
  console.log(res);
});
