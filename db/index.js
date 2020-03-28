const knex = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-79-125-26-232.eu-west-1.compute.amazonaws.com",
    user: "uzmxmtyuejlpkz",
    password:
      "0cdd01f8f144c47aa5fa29f82c1bcb97cf6b96c23c94ae452be667646f483607",
    database: "d4lj4ec18roqkr",
    port: 5432,
    ssl: true,
  },
});

module.exports = knex;
