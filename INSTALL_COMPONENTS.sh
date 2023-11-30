#!/bin/bash

if ! command -v java &> /dev/null; then
    echo "Please, install Java and try again."
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "Please, install Apache Maven and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Please, install Node Package Manager (NPM) and try again."
    exit 1
fi

echo "Installing backend dependencies..."
cd backend
mvn clean install

cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Configuring database..."
echo "We will assume username: root, password: "
echo "Please, edit this file or install the database manually if you have an error."

# DB confir
DB_USER="root"
DB_PASSWORD=""
DB_NAME="note_application"
SQL_FILE="note_application_db.sql"

# Command for installing the db
mysql -u"${DB_USER}" -p"${DB_PASSWORD}" "${DB_NAME}" < "${SQL_FILE}"

echo "Running servers..."
cd backend
mvn spring-boot:run

cd ..
cd frontend
npm start