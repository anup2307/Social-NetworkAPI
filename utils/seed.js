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
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Create empty array to hold the thoughts
  const thoughtsSchema = [];

  // Loop 5 times -- add thoughts to the thoughts array
  for (let i = 0; i < 5; i++) {
    // Get some random thoughts objects using a helper function that we imported from ./data
    const thoughtText = getRandomthought();
    const username = `${getRandomName()}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;
    const reactions = getRandomreactions(2);
    thoughtsSchema.push({
      thoughtText,
      username,
      reactions,
    });
  }
  // Add Thoughts to the collection and await the results
  const thoughtcollection = await Thoughts.collection.insertMany(
    thoughtsSchema
  );

  // Loop 5 times -- add users to the collection
  let friends = [];
  for (let i = 0; i < 5; i++) {
    const username = thoughtsSchema[i].username;
    const email = `${username}@jd.com`;
    let thoughts = [];
    thoughts.push(thoughtcollection.insertedIds[i]);

    const usercollection = await Users.collection.insertOne({
      username,
      email,
      thoughts,
      friends,
    });
    friends.push(usercollection.insertedId);
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughtsSchema);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
