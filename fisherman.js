/**
 * Fisherman is a small command-line game in JavaScript.
 * This file has the various game menus and provides the repl.
 */

"use strict"

var prompt = require("prompt");
var game = require("./lib/game");
var dom = require("./lib/domain");

/**
 * Start game
 */
(function () {

    console.log("=== Welcome to Fisherman! ===");
    prompt.start();
    prompt.message = "$>";

    var fishingMenu = {
        properties: {
            command: {
                description: " ",
                type: "string",
                pattern: /inv|fish|shop|echo[a-zA-Z\s]*|help|quit|exit/,
                //pattern: /"^[a-zA-Z\s\-]+$"/,
                message: "Not a valid command. Try \"help\" to get a list of valid commands.",
                required: true
            }
        }
    };

    game.setPlayer(new dom.Player("Default player 1"));

    /**
     * Read-eval-print-loop that accepts user input, processes it and awaits further input.
    */
    (function repl() {
        prompt.get(fishingMenu, function (err, result) {
            if (err) {
                console.log("We didn't quite get that")
            };
            var input = new CleanInput(result.command);
            var continuePlaying = processCommand(input.command, input.args);
            continuePlaying
                ? repl() // Continue game
                : console.log("=== Thank you for having played Fisherman! ==="); // Player quit
        });
    })(); // Self-invocation to start the repl

})(); // Self-invocation to start the game

/**
 * Separates user input into a command and additional parameters.
 *
 * @param {*} input
 */
function CleanInput(input) {
    var temp = (input + "").split(" ");
    this.command = temp[0];
    temp.slice(1)
        ? this.args = temp.slice(1).join(" ")
        : null;
}

/**
 * Dispatches the received command to the appropriate method.
 *
 * @param {string} command
 * @param {string[]} args
 */
function processCommand(command, args) {

    switch (command) {

        case "inv":
            format(game.getPlayerInventory());
            break;
        case "fish":
            format(game.fish());
            break;
        case "shop":
            format(game.shop());
            break;
        case "echo":
            format("Echo: " + args);
            break;
        case "help":
            format(help());
            break;
        case "quit":
        case "exit":
            return false;
        default:
            console.log("This message indicated a command has been defined without handler.\nThis indicat" +
                    "es a programming error.");
    }
    return true;
}

/**
 * Displays a list of available commands.
 */
function help() {
    var msg = ("--- Fisherman help ---");
    msg += "\nYou are currently fishing. Available commands:";
    msg += "\n  inv  -- Displays the player inventory";
    msg += "\n  fish -- Attempts to catch a fish";
    msg += "\n  quit -- Quit the game";
    msg += "\n  exit -- Synonymous to quit";
    return msg;
}

function format(message) {
    console.log("\n    " + message, "\n");
}