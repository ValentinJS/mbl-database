#!/usr/bin/env node

const fs = require("fs");

// rawdata are the Data users entered in the Google Sheet
// https://docs.google.com/spreadsheets/d/1ZJy8kUiwvkA6aUTwHExUdns-95lQ_IUZwBwsxWSJno0/edit#gid=0
let raw = fs.readFileSync("data/rawdata.json");
let content = JSON.parse(raw);
let data = [];

// handgamedata and compactgamedata are data found in the Android folder
// Android/data/com.nexon.devcat.marvelbattlelines/files/CardViewImageCache
// They contains the actual name of the Card, use as ID and as asset name
// Names are divided between the two files, so we merge them
let rawhandgamedata = fs.readFileSync("data/handgamedata.json");
let rawcompactgamedata = fs.readFileSync("data/compactgamedata.json");
let handgamedata = JSON.parse(rawhandgamedata)['slots'];
let compactgamedata = JSON.parse(rawcompactgamedata)['slots'];
let gamedata = Object.assign(handgamedata, compactgamedata);

// Fix some mistakes
delete gamedata['SHIELDTrainingHumanoidStoryOnly'];
delete gamedata['PumpkinBombDeliveryHalloween2018'];

let cardTitles = Object.keys(gamedata);
let unmatchedTitles = cardTitles.slice();

let rarityTable = {
  'Common': 0,
  'Uncommon': 1,
  'Rare': 2,
  'Epic': 3
};

content.forEach((e) => {

  // Match the human readable 'Card Name' from the gDoc with the ID from gamedatas
  let cardTitle = cardTitles.find((title) => {
    return title.toLowerCase().includes(e['Card Name'].replace(/[ ()-.']/gi, '').toLowerCase())
  });
  if (!cardTitle) {
    cardTitle = 'undefined';
    console.log('WARNING, name not found for card ' + e['Card Name']);
  } else {
    unmatchedTitles.splice(unmatchedTitles.indexOf(cardTitle), 1);
  }

  const replaceMistake = (name, title) => {
    if (e['Card Name'] === name) {
      cardTitle = title;
      unmatchedTitles.splice(unmatchedTitles.indexOf(title), 1);
    }
  }

  replaceMistake('Bullseye', 'BullseyeLester');
  replaceMistake('Fire Demon', 'FireDemon');
  replaceMistake('Thor', 'ThorThorOdinson');
  replaceMistake('Hulk', 'HulkBruceBanner');
  replaceMistake('Ultron', 'undefined'); // To fix when I'll know the title from the rawgamedata
  replaceMistake('Tony Stark', 'undefined'); // Same same

  data.push({
    'name': e['Card Name'],
    'title': cardTitle,
    'cost': e['Cost'],
    'atk': e['ATK lvl1'],
    'hp': e['HP lvl1'],
    'rarityName': e['Rarity'],
    'rarity': rarityTable[e['Rarity']],
    'ability': e['Ability lvl1']
  });
});

data.sort((a,b) => a['name'].localeCompare(b['name']));

unmatchedTitles.forEach((title) => {
  console.log('WARNING, card not found for name ' + title);
})

let json = JSON.stringify(data, null, 2);
fs.writeFile('src/data/cards.json', json, 'utf8', () => {});