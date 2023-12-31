const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughts = [
  "Decision Trackers are awesome",
  "Find My Phone is a useful app",
  "Learn Piano is not very good for learning Piano",
  "Starbase Defender is a great game, I love it",
  "Tower Defense is okay",
  "Monopoly Money is better than real money IMO",
  "Movie trailers are just the best parts of a movie distilled into 90 seconds",
  "Hello world, this is a comment",
  "Social media is a big waste of time",
  "Notes is my most used app",
  "Messages is open on my computer 24/7",
  "Email is open on my computer",
  "Compass is never opened",
  "Firefox is great for privacy",
];

const reactionArr = [
  "lorem",
  "imsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "curabitur",
  "vel",
  "hendrerit",
  "libero",
  "eleifend",
  "blandit",
  "nunc",
  "ornare",
  "odio",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random thought
const getRandomthought = () => `${getRandomArrItem(thoughts)}`;

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(names)}`;

// Function to generate random reactions that we can add to the thoughts.
const getRandomreactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionArr),
      username: `${getRandomName()}${Math.floor(
        Math.random() * (99 - 18 + 1) + 18
      )}`,
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomreactions, getRandomthought };
