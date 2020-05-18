const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const defaultResults = process.env.defaultResults || 8
const tableName = process.env.restaurants_table

const findRestaurantsByRestaurants = async (theme, count) => {
  const req = {
    TableName: tableName,
    Limit: count,
    Filter: "contains(themes, :themes)",
    ExpressionAttributeValues: {":theme": theme}
  }

  const resp = await dynamodb.scan(req).promise()
  return resp.Items
}

module.exports.handler = async (event, context) => {
  let req = JSON.parse(event.body);
  const restaurants = await findRestaurantsByRestaurants(req.theme, defaultResults)
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }
  console.log(response)

  return response
}
