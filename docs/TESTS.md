# Tests

## End-to-End (e2e) tests

You can run the e2e tests with `yarn e2e`. This will stop all docker containers, clear the necessary ports, start the containers and the app, and then run the tests.

# Problems

## e2e cases failed with "Connection refused! Is selenium server started"

**Problem**:

```
   { Error [ERR_UNHANDLED_ERROR]: Unhandled error. ([object Object])
   at ClientManager.emit (events.js:140:19)
   at Nightwatch.<anonymous> .....
   .....
   context:
   { message: 'Connection refused! Is selenium server started?\n',
     data: { value: [Object], status: 33 } } }
   .....
```

**Solution**:
```
  - Ensure the required version of selenium package is installed
    yarn list | grep selen

  - Ensure to check selenium server is not running prior to starting the e2e tests.
    ps -ef | grep sele

  - Ensure the server is started when "yarn e2e" is run by running
    ps -ef | grep sele
    502 44074 44068   0 12:23PM ttys008    0:00.06 /usr/bin/java -jar ./node_modules/selenium-server/lib/runner/selenium-server-standalone-3.8.1.jar -port 4444

    Ensure the pid on the output matches the one displayed when yarn e2e was started.  
    Look for line that says "Starting selenium server... started - PID:  44074"
```
