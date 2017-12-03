# Running Smoke Tests

Give this a skim -> http://nightwatchjs.org/gettingstarted

1. Install JDK
You will need to have the Java Development Kit (JDK) (http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed, minimum required version is 7. You can check this by running java -version from the command line.

2. Download Selenium
Download the latest version of the selenium-server-standalone-{VERSION}.jar file from http://selenium-release.storage.googleapis.com/index.html

3. Download ChromeDriver
https://chromedriver.storage.googleapis.com/index.html?path=2.33/

4. Populate bin folder
- In the project root, create a folder called 'bin'
- Populate it with the dowloaded selenium-server-standalone-{VERSION}.jar and chromedriver

5. Start the app
Normal process with yarn db, yarn start:dev

6. Run smoke test
Eg yarn smoke:kevin
