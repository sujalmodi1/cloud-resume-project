const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  const connectionString = process.env.AzureWebJobsStorage;
  const tableName = "visitCounter";
  const partitionKey = "visitor";
  const rowKey = "counter";

  const client = TableClient.fromConnectionString(connectionString, tableName);

  // Ensure table exists
  await client.createTable();

  try {
    let entity = await client.getEntity(partitionKey, rowKey);
    entity.count = parseInt(entity.count) + 1;
    await client.updateEntity(entity, "Replace");
    context.res = {
      status: 200,
      body: { count: entity.count }
    };
  } catch (err) {
    if (err.statusCode === 404) {
      await client.createEntity({ partitionKey, rowKey, count: 1 });
      context.res = { status: 200, body: { count: 1 } };
    } else {
      context.log("Error:", err);
      context.res = { status: 500, body: "Error updating visitor count." };
    }
  }
};
