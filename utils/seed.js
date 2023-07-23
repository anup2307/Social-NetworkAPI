const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");
const {
  getRandomName,
  getRandomreactions,
  getRandomthought,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "Users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("Users");
  }

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 5 times -- add thoughts to the thoughts array
  for (let i = 0; i < 5; i++) {
    // Get some random thoughts objects using a helper function that we imported from ./data
    const thoughtText = getRandomthought();
    const username = `${getRandomName()}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;
    const reactions = getRandomreactions(5);
    thoughts.push({
      thoughtText,
      username,
      reactions,
    });
  }
  // Add Thoughts to the collection and await the results
  await Thoughts.collection.insertMany(thoughts);

  // Create empty array to hold the Users
  const users = [];

  // Loop 10 times -- add Users to the user array
  for (let i = 0; i < 10; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = `${getRandomName()}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;
    const email = `${username}@jd.com`;
    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await Users.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
