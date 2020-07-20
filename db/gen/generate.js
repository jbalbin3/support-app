/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const faker = require('faker');

const {
  addictions, cities, connectionTypes, sexualOrientations, genders,
} = require('./resource.js');

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const randomDayOfMonth = (randomMonth) => {
  let randomDay = null;
  for (let j = 1; j <= 12; j++) {
    switch (randomMonth) {
      case 1:
        randomDay = randomInt(31) + 1;
        break;
      case 2:
        randomDay = randomInt(28) + 1;
        break;
      case 3:
        randomDay = randomInt(31) + 1;
        break;
      case 4:
        randomDay = randomInt(30) + 1;
        break;
      case 5:
        randomDay = randomInt(31) + 1;
        break;
      case 6:
        randomDay = randomInt(30) + 1;
        break;
      case 7:
        randomDay = randomInt(31) + 1;
        break;
      case 8:
        randomDay = randomInt(31) + 1;
        break;
      case 9:
        randomDay = randomInt(30) + 1;
        break;
      case 10:
        randomDay = randomInt(31) + 1;
        break;
      case 11:
        randomDay = randomInt(30) + 1;
        break;
      case 12:
        randomDay = randomInt(31) + 1;
        break;
      default:
        randomDay = randomInt(31) + 1;
    }
  }
  return randomDay;
};

// /////////////////////////////////////////////////////////////////

const generateUsers = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/users.csv');
  stream.write('email,username,firstname,password,created_on,last_login,picture_url,bio,struggle,location,clean_date\n');

  for (let i = 0; i < numOfUsers; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const firstname = faker.name.firstName();
    const password = faker.internet.password();

    let created_on = null;
    const randomMonth = randomInt(12) + 1;
    const randomDay = randomDayOfMonth(randomMonth);
    created_on = `2020-${randomMonth}-${randomDay} 0:00:00`;

    let last_login = null;
    let lastLoginMonth = null;
    if (randomMonth === 12) {
      lastLoginMonth = 1;
    } else {
      lastLoginMonth = randomMonth + 1;
    }
    const lastLoginDay = randomDayOfMonth(lastLoginMonth);
    last_login = `2020-${lastLoginMonth}-${lastLoginDay} 0:00:00`;

    const picture_url = faker.internet.avatar();
    const bio = faker.lorem.sentences();
    const struggle = faker.lorem.sentence();
    const location = randomInt(cities.length) + 1;

    const cleanTimeStartYears = [];
    for (let y = 1960; y <= 2020; y++) {
      cleanTimeStartYears.push(y);
    }
    const cleanTimeYear = cleanTimeStartYears[randomInt(cleanTimeStartYears.length)];
    const cleanTimeMonth = randomInt(12) + 1;
    const cleanTimeDay = randomDayOfMonth(cleanTimeMonth);
    const clean_date = `${cleanTimeYear}-${cleanTimeMonth}-${cleanTimeDay}`;

    stream.write(`${email},${username},${firstname},${password},${created_on},${last_login},${picture_url},${bio},${struggle},${location},${clean_date}\n`);
  }
};

generateUsers(300);

// /////////////////////////////////////////////////////////////////

const generateLocations = () => {
  const stream = fs.createWriteStream('./db/csv/locations.csv');
  stream.write('city,country\n');

  for (let i = 0; i < cities.length; i++) {
    stream.write(`${cities[i]},United States\n`);
  }
};

generateLocations();

// /////////////////////////////////////////////////////////////////

const generateAddictions = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/addictions.csv');
  stream.write('user_profile_id,addiction_type\n');

  for (let i = 1; i <= numOfUsers; i++) {
    const user_profile_id = i;
    const duplicateCheck = {};
    const numOfAddictionsForUser = randomInt(addictions.length) + 1;
    for (let j = 0; j < numOfAddictionsForUser; j++) {
      const addiction_type = addictions[randomInt(addictions.length)];
      if (duplicateCheck[addiction_type] === undefined) {
        duplicateCheck[addiction_type] = true;
        stream.write(`${user_profile_id},${addiction_type}\n`);
      }
    }
  }
};

generateAddictions(300);

// /////////////////////////////////////////////////////////////////

const generateRelationshipOptions = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/relationships.csv');
  stream.write('gender,sexual_orientation\n');

  for (let i = 0; i < numOfUsers; i++) {
    const gender = genders[randomInt(genders.length)];
    const sexual_orientation = sexualOrientations[randomInt(sexualOrientations.length)];
    stream.write(`${gender},${sexual_orientation}\n`);
  }
};

generateRelationshipOptions(300);

// /////////////////////////////////////////////////////////////////

const generateUserConnections = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/connections.csv');
  stream.write('user_profile_id,connection_type,relationship_option\n');

  for (let i = 1; i <= numOfUsers; i++) {
    const user_profile_id = i;
    const relationship_option = i;
    const duplicateCheck = {};
    const numOfConnectionsForUser = randomInt(connectionTypes.length) + 1;
    for (let j = 0; j < numOfConnectionsForUser; j++) {
      const connection_type = connectionTypes[randomInt(connectionTypes.length)];
      if (duplicateCheck[connection_type] === undefined) {
        duplicateCheck[connection_type] = true;
        stream.write(`${user_profile_id},${connection_type},${relationship_option}\n`);
      }
    }
  }
};

generateUserConnections(300);

// /////////////////////////////////////////////////////////////////

const generateMessages = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/messages.csv');
  stream.write('body,sender_id,recipient_id, created\n');

  for (let i = 1; i <= numOfUsers; i++) {
    const recipient_id = i;
    const duplicateCheck = {};
    const numOfMessagesForUser = randomInt(20) + 1;
    for (let j = 0; j < numOfMessagesForUser; j++) {
      const sender_id = randomInt(numOfUsers) + 1;
      if (sender_id !== recipient_id && duplicateCheck[sender_id] === undefined) {
        duplicateCheck[sender_id] = true;

        const body = faker.lorem.sentences();

        const availableYears = [];
        for (let y = 1960; y <= 2020; y++) {
          availableYears.push(y);
        }

        const createdYear = availableYears[randomInt(availableYears.length)];
        const createdMonth = randomInt(12) + 1;
        const createdDay = randomDayOfMonth(createdMonth);
        const created_day = `${createdYear}-${createdMonth}-${createdDay}`;

        stream.write(`${body},${sender_id},${recipient_id},${created_day}\n`);
      }
    }
  }
};

generateMessages(300);

// /////////////////////////////////////////////////////////////////

const generateFriends = (numOfUsers) => {
  const stream = fs.createWriteStream('./db/csv/friends.csv');
  stream.write('requestor_id,target_id,confirmed\n');

  for (let i = 1; i <= numOfUsers; i++) {
    const requestor_id = i;
    const duplicateCheck = {};
    const numOfFriendsForUser = randomInt(100) + 1;
    for (let j = 0; j < numOfFriendsForUser; j++) {
      const target_id = randomInt(numOfUsers) + 1;
      if (target_id !== requestor_id && duplicateCheck[target_id] === undefined) {
        duplicateCheck[target_id] = true;
        let confirmed = null;
        if (j % 10 === 0) {
          confirmed = false;
        } else {
          confirmed = true;
        }
        stream.write(`${requestor_id},${target_id},${confirmed}\n`);
      }
    }
  }
};

generateFriends(300);
