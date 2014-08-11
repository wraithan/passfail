# passfail

Wraps `nodemon` and adds `--pass` and `--fail` which will be executed when the
command that `nodemon` finishes running with a 0 or non-0 exit code.

## Usage

```passfail [--pass "passcomand"] [--fail "failcommand"] <nodemon options>```

`passfail` pulls its options out of `process.argv` and removes them before
forwarding the rest of the options to `nodemon`

## Disclaimer

Written mostly a night while I couldn't sleep. Doesn't do any real error
checking or anything.
