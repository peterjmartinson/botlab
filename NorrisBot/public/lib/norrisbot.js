'use strict';

var util   = require('util');
var path   = require('path');
var fs     = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot    = requre('slackbots');

var NorrisBot = function Constructor(settings) {
  this.setting       = settings;
  this.settings.name = this.settings.name || 'norrisbot';
  this.dbPath        = settings.dbPath
             || path.resolve(process.cwd(), 'data', 'norrisbot.db');
  
  this.user = null;
  this.db   = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(NorrisBot, Bot);

module.exports = NorrisBot;

NorrisBot.prototype.run = function() {
  NorrisBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

NorrisBot.prototype._onStart = function() {
  this._loadBotUser();
  this._connectDb();
  this._firstRunCheck();
};

// find Bot's name in the list of Slack users
NorrisBot.prototype._loadBotUser = function() {
  var self = this;
  this.user = this.users.filter(function(user) {
    return user.name === self.name;
  })[0];
};

NorrisBot.prototype._connectDb = function() {
  if (!fs.existsSync(this.dbPath)) {
    console.error('Database path ' + '"' + this.dbPath + '" does not exist or it\'s not readable."
    process.exit(1);
  }

  this.db = new SQLite.Database(this.dbPath);
};



