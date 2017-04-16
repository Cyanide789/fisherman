"use strict"

var test = require("tape");
var dom = require("../lib/domain");

/**
 * Unit tests for Fish object.
 */
test("Can construct a Fish object", function (assert) {
    var nemo = new dom.Fish(dom.getSpecies().cod, 5, 4);
    assert.equals(nemo.species, dom.getSpecies().cod, "Nemo is a cod");
    assert.equals(nemo.size, 5, "Nemo's size is 5");
    assert.equals(nemo.weight, 4, "Nemo's weight is 4");
    assert.end();
})

test("Species are immutable", function (assert) {
    assert.equals(dom.getSpecies().cod, "COD", "The species cod is labeled \"COD\"");
    dom.getSpecies().cod = "BASS";
    assert.equals(dom.getSpecies().cod, "COD", "It is not possible to modifify \"COD\" to \"BASS\"");
    assert.end();
})

test("It is not possible to create a Fish with inexistent species", function (assert) {
    assert.throws(() => new dom.Fish("INVALID", 5, 4), /valid/, "Creating a fish with invalid species raises error");
    assert.end();
})

test("It is not possible to create a Fish with invalid size", function (assert) {
    assert.throws(() => new dom.Fish(dom.getSpecies().cod, "INVALID", 2), /valid/, "Creating a fish with invalid size raises error");
    assert.end();
})

test("It is not possible to create a Fish with invalid weight", function (assert) {
    assert.throws(() => new dom.Fish(dom.getSpecies().cod, 1, "INVALID"), /valid/, "Creating a fish with invalid weight raises error");
    assert.end();
})

test("Fish toString() has been overridden", function (assert) {
    var dory = new dom.Fish(dom.getSpecies().cod, 5, 5);
    assert.true(dory.toString().search(/object/) == -1, "Fish.toString() does not contain the string \"object\"");
    assert.end();
})

/**
 * Unit tests for Player object.
 */
test("Can construct a Player object", function (assert) {
    var jack = new dom.Player("Jack");
    assert.equals(jack.name, "Jack", "Jack's name is \"Jack\"");
    assert.true(jack.stats.skill > 0, "Jack's skill is greater than 0");
    assert.true(jack.inventory.credits > 0, "Jack has credits");
    assert.true(jack.inventory.bait > 0, "Jack has bait");
    assert.end();
})

test("Can add fish to player inventory", function (assert) {
    var jack = new dom.Player("Jack");
    var dory = new dom.Fish(dom.getSpecies().cod, 5, 5);
    var invLength = jack.inventory.fish.length;
    jack.inventory.addFish(dory);
    assert.equals(jack.inventory.fish.length - invLength, 1, "Jack has one more fish than he started with");
    assert.end();
})

test("Can use bait", function (assert) {
    var jack = new dom.Player("Jack");
    var bait = jack.inventory.bait;
    jack.inventory.useBait(3);
    assert.equals(bait - jack.inventory.bait, 3, "Jack has used 3 bait");
    assert.end();
})

test("Player toString() has been overridden", function (assert) {
    var jack = new dom.Player("Jack");
    assert.true(jack.toString().search(/object/) == -1, "Player.toString() does not contain the string \"object\"");
    assert.end();
})