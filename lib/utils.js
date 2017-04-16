/*
  This is an exploratory project to learn JavaScript

  @author tom.piccin
*/

"use strict"

module.exports = {

    /**
     * Throws an eror with the provided message.
     *
     * @param {*} message
    */
    _throw: function (message) {
        throw message;
    },
    /**
     * Checks whether the argument is a string.
     *
     * @param {*} candidateString
     */
    isString: function (candidateString) {
        return typeof candidateString === 'string';
    },
    /**
     * Checks whether the argument is a number.
     *
     * @param {*} candidateNumber
    */
    isNumber: function (candidateNumber) {
        return typeof candidateNumber === 'number';
    },
    /**
     * Returns a random integer between minimum and maximum.
     *
     * @param {Number} minimum
     * @param {Number} maximum
     */
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}