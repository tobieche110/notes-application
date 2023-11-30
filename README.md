# notes-application

The backend for this application was made using Java Spring Boot (Maven) and React JS.
Versions of every framework/langueage used:
* Java 18.0.1.1 2022-04-22
* Apache Maven 3.9.5 (57804ffe001d7215b5e7bcb531cf83df38f93546)
* Node Package Manager (NPM) 9.5.1
* Spring Boot 3.2.0
* **XAMPP v3.3.0**: Make sure to have MySQL and Apache services installed and running.

## Things to consider:
* To install all components, run INSTALL_COMPONENTS.sh, it will also start both server apps (backend and frontend).
* DB installation from bash is unstable, manual installation via phpMyAdmin or console is suggested and may be required to run the app.
* If the DB was not installed properly, server booting will fail.

## MANUAL INSTALLATION IF INSTALL_COMPONENTS.sh FAILS:
* First, make sure to have the DB properly set up. DB name must be **note_application**
* Make sure to have MySQL and Apache services installed and running via XAMPP.
* Go to the backend folder and run "mvn clean install"
* Go to the frontend folder and run "npm install"
* Frontend might load faster than backend, so you may have to refresh the page the first time. After that, its full SPA :)

## BOOTING UP THE SERVERS:
* In the backend folder, run "mvn spring-boot:run"
* In the frontend folder, run "npm start"
* Frontend should start at localhost:3000
