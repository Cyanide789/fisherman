/**
 * This file has all actions that a player can perform in the game.
 * Before invoking any methods, the current game player must be set.
 */

"use strict"

var dom = require("./domain");
var utils = require("./utils");

module.exports = {
    fish,
    getPlayerInventory,
    setPlayer,
    shop
};

var currentPlayer;

/**
 * Set the current game player.
 *
 * @param {*} player
 */
function setPlayer(player) {
    currentPlayer = player;
}

/**
 * Attempts to catch a fish.
 * If the player has bait, catching succeeds. If not, no action.
 */
function fish() {
    if (currentPlayer.inventory.bait > 0) {
        currentPlayer.inventory.useBait(1);
        var fish = generateFish();
        currentPlayer.inventory.addFish(fish);
        return "You got a fish! " + fish.toStringPretty();
    } else {
        return "You lack sufficient bait - go buy some in the store.";
    }
}

/**
 * Returns a string of the player inventory, in a pretty format.
 */
function getPlayerInventory() {
    return "--- Player inventory ---\n" + currentPlayer.inventory.toStringPretty();
}

/**
 * Not implemented yet
 */
function shop() {
    currentPlayer.inventory.bait = 10;
    return "Your bait has been set to 10.";
}

/**
 * Private.
 * Generates a new fish based on magic.
 */
function generateFish() {
    var randomIndex = utils.randomInt(0, Object.keys(dom.getSpecies()).length - 1);
    var randomProperty = Object.keys(dom.getSpecies())[randomIndex];
    var species = dom.getSpecies()[randomProperty];
    var size = utils.randomInt(1, 10);
    var weight = utils.randomInt(1, 10);
    return new dom.Fish(species, size, weight);
}