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

// Methods
const add = (call, callback) => {
  callback(null, {
    message: 500 + parseInt(call.request.someDigit),
  });
};

const subtract = (call, callback) => {
  callback(null, {
    message: 500 - parseInt(call.request.someDigit),
  });
};

// Server
const main = () => {
  const server = new grpc.Server();
  server.addService(proto.Calculator.service, {
    add,
    subtract,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
};

main();
