# Test Alsatian toThrowAsync

## Prerequisits
- node
- yarn
- alsatian is installed at ../alsatian.myfork 

## Install with
```
yarn
```
## Run
```
yarn test
```
Expected output:
```
$ yarn test
yarn test v0.23.2
$ tsc -p tsconfig.json
$ alsatian --timeout 2000 test.js --tap | tap-fail-exit-one 
TAP version 13
1..3
# FIXTURE Test async toThrow
testToThrow:+
testToThrow:-
ok 1 test alsatian toThrow
testAsync:+ 1800
asyncThrowError:+ delayMs=1800
asyncThrowError:- delayMs=1800
asyncThrowError.setTimeoutFunc:+ delayMs=1800 rejecting
asyncThrowError.setTimeoutFunc:- delayMs=1800 rejected
testAsync:- 1800
ok 2 test alsatian async ( 1800 )
testAsyncToThrow:+ 1750
asyncThrowError:+ delayMs=1750
asyncThrowError:- delayMs=1750
asyncThrowError.setTimeoutFunc:+ delayMs=1750 rejecting
asyncThrowError.setTimeoutFunc:- delayMs=1750 rejected
testAsyncToThrow:- 1750
ok 3 test alsatian async toThrow ( 1750 )
Done in 6.21s.
```
