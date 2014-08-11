#!/usr/bin/env node
var nodemon = require('nodemon')
var childProcess = require('child_process')

if (require.main === module) {
    main();
}

function main() {
  var pass = ''
  var passIdx = process.argv.indexOf('--pass')
  if (passIdx !== -1) {
    console.log('found pass: ', passIdx)
    pass = process.argv[passIdx+1]
    process.argv.splice(passIdx, 2)
  }

  var fail = ''
  var failIdx = process.argv.indexOf('--fail')
  if (failIdx !== -1) {
    console.log('found fail: ', failIdx)
    fail = process.argv[failIdx+1]
    process.argv.splice(failIdx, 2)
  }

  var nodemonArgs = process.argv.slice(2)
                                .map(function (element) {
                                  if (element.indexOf(' ') !== -1) {
                                    element = '"' + element + '"'
                                  }
                                  return element
                                })
                                .join(' ')
  console.log(nodemonArgs)
  nodemon(nodemonArgs)
  if (pass.length > 0) {
    console.log('attaching "%s" to success', pass)
    nodemon.on('exit', function () {
      childProcess.exec(pass)
    })
  }
  if (fail.length > 0) {
    console.log('attaching "%s" to failure', fail)
    nodemon.on('crash', function () {
      childProcess.exec(fail)
    })
  }
}