"use strict"

var test = require("tape");
var game = require("../lib/game");
var dom = require("../lib/domain");

test("Can fish", function (assert) {
    var player = new dom.Player("player1");
    var bait = player.inventory.bait;
    var fish = player.inventory.fish.length;
    assert.true(player.inventory.bait > 0, "Precondition: the player has bait");
    game.setPlayer(player);
    game.fish();
    assert.true(bait - player.inventory.bait > 0, "The player has used bait");
    assert.true(player.inventory.fish.length - fish > 0, "The player has gained at least one fish");
    assert.end();
})

test("Cannot fish when out of bait", function (assert) {
    var player = new dom.Player("player1");
    player.inventory.bait = 0;
    var fish = player.inventory.fish.length;
    assert.equals(player.inventory.bait, 0, "Precondition: the player has no bait");
    game.setPlayer(player);
    game.fish();
    assert.equals(player.inventory.bait, 0, "The player still has no bait");
    assert.equals(player.inventory.fish.length, 0, "The player has not gained any fish");
    assert.end();
})

test("Can get player inventory", function (assert) {
    var player = new dom.Player("player1");
    game.setPlayer(player);
    assert.true(game.getPlayerInventory().length > 0, "Player inventory has length > 0");
    assert.end();
})