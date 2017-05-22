/**
 * This file has all domain objects.
 */

"use strict"

var utils = require("./utils");

module.exports = {
    getSpecies,
    Fish,
    Player
};

/**
 * Enumeration of available fish species.
 */
function getSpecies() {

    var _trout = "TROUT",
        _salmon = "SALMON",
        _cod = "COD";

    var innerObject = {
        cod: _cod,
        salmon: _salmon,
        trout: _trout
    }

    return innerObject;
}

/**
 * Create a Fish object.
 * Must provide a valid species.
 *
 * @param {*} species
 * @param {Number} size
 * @param {Number} weight
 */
function Fish(species, size, weight) {

    for (var key in getSpecies()) {
        if (getSpecies()[key] == species) {
            this.species = species;
            break;
        }
    }

    this.species
        ? null
        : utils._throw(species + " is not a valid fish species!");
    utils.isNumber(size)
        ? this.size = size
        : utils._throw(size + " is not a valid size (non-numeric)!");
    utils.isNumber(weight)
        ? this.weight = weight
        : utils._throw(weight + " is not a valid weight (non-numeric)!");

    this.toString = function () {
        return "Fish: {species: " + this.species + ", size: " + this.size + ", weight: " + this.weight + "}";
    }

    this.toStringPretty = function () {
        var msg = this.species + "";
        return msg.slice(0, 1) + msg.slice(1).toLowerCase() + ", size: " + this.size + ", weight: " + this.weight;
    }
}

/**
 * Create a PlayerStats object.
 */
function PlayerStats() {
    this.skill = 1;
    this.toString = function () {
        return "PlayerStats: {skill: " + this.skill + "}";
    }
}

/**
 * Create a PlayerInventory object.
 */
function PlayerInventory() {
    this.credits = 200;
    this.bait = 10;
    this.fish = [];

    this.addFish = function (fish) {
        this.fish.push(fish);
    }

    this.useBait = function (value) {
        this.bait -= value;
    }

    this.toString = function () {
        return "PlayerInventory: {credits: " + this.credits + ", bait: " + this.bait + ", fish: " + this.fish + "}";
    }

    this.toStringPretty = function () {
        var msg = "%scredits:  " + this.credits;
        msg += "%sbait:     " + this.bait;
        for (var key in this.fish) {
            msg += "%s" + this.fish[key].toStringPretty();
        }
        return msg;
    }
}

/**
 * Create a Player object.
 *
 * @param {string} name
 */
function Player(name) {

    utils.isString(name)
        ? this.name = name
        : utils._throw(name + " is not a valid name!");

    this.stats = new PlayerStats();
    this.inventory = new PlayerInventory();

    this.toString = function () {
        return "Player: {name: " + this.name + ", " + this.stats.toString() + ", " + this.inventory.toString() + "}";
    }
}