"use strict";

// item of children-say

let ChildrenSayItem = function (text) {
    if (text) {
        let obj = JSON.parse(text);
        // todo
    } else {
        // todo
    }
};

ChildrenSayItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

// core actions of children-say

let ChildrenSay = function () {
    LocalContractStorage.defineMapProperty(this, "walletContents");
    LocalContractStorage.defineMapProperty(this, "essenceContents", {
        parse: function (text) {
            // todo
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

ChildrenSay.prototype = {

    init: function () {
        // todo
    }

    // todo

};

module.exports = ChildrenSay;
