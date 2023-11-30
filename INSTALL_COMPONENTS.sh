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

echo "REMEMBER TO HAVE MYSQL AND APACHE SERVICES RUNNING ON XAMPP"
echo "REMEMBER TO HAVE MYSQL AND APACHE SERVICES RUNNING ON XAMPP"
echo "REMEMBER TO HAVE MYSQL AND APACHE SERVICES RUNNING ON XAMPP"

echo "Configuring database..."
echo "We will assume username: root, password: "
echo "Please, edit this file or install the database manually if you have an error."

# MySQL Path
MYSQL_PATH="opt/lampp/bin"
export PATH="$MYSQL_PATH:$PATH"

# DB config
DB_USER="root"
DB_NAME="note_application"
SQL_FILE="note_application_db.sql"

# Command for installing the db
mysql -u"${DB_USER}" -p "${DB_NAME}" < "${SQL_FILE}"

echo "Installing backend dependencies..."
echo "MAKE SURE TO HAVE THE DATABASE INSTALLED"
cd backend
mvn clean install

cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install

cd ..

echo "Running servers..."

cd backend

if [ ! -f "pom.xml" ]; then
    echo "Error: pom.xml not found in the specified directory."
    exit 1
fi

gnome-terminal -- bash -c "mvn spring-boot:run" &

cd ..

cd frontend

npm start

echo "FINISH"
