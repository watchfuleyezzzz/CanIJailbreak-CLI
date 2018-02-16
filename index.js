#!/usr/bin/env node
const program = require("yargs");
const semver = require("semver");
const request = require("request-promise");

program.command(["how [os]", "howto [os]"], "Checks how to jailbreak a version.", {}, checkJailbreak);
program.command("exists [os]", "Checks if a version is jailbreakable.", {}, checkIfJailbreakable);
program.help();
program.argv;

async function checkJailbreak(args) {
    let output = await request({
        method: 'GET',
        url: 'https://canijailbreak.com/jailbreaks.json',
        json: true
    });
    let matches = output.jailbreaks.filter(function (value) {
        return semver.satisfies(args.os, `${value.ios.start} - ${value.ios.end}`)
    });

    console.log(matches)
};
async function checkIfJailbreakable(args) {
    console.log(args);
};