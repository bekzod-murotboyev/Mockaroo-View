# *Initialization Linux Server*

---

## *1. Prepare Server*

- *Update existing libraries*

 ```
sudo apt update
 ```

---

## *2. Install Nginx*

 ```
sudo apt install nginx
 ```
---

## *3. Install Git*

 ```
sudo apt install git
 ```
---
## *4. Install Maven and JAVA*
- It installs both of Maven and Java
 ```
sudo apt install mvn
 ```
---
## *5. Install Postgresql*
- First, you should install prerequisite software packages that will be used to download and install software certificates for a secure SSL connection.
 ```
sudo apt install mvn
 ```
- Then, get the certificate, add it to apt-key management utility and create a new configuration file with an official PostgreSQL repository address inside.
```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```
```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
```
- It is always a good idea to download information about all packages available for installation from your configured sources before the actual installation.
```
sudo apt update
```
- Now is the time to do the actual PostgreSQL installation. This will install the latest PostgreSQL version along with the newest extensions and additions that are not yet officially part of the PostgreSQL core.
```
sudo apt install postgresql postgresql-contrib
```

- After the installation you may double-check that postgresql daemon is active.
```
service postgresql status
```
The output should look like this:
![template](img.png)
- A “psql” command-line client tool is used to interact with the database engine. You should invoke it as a “postgres” user to start an interactive session with your local database.
```
sudo -u postgres psql
```
- Since the default “postgres” user does not have a password, you should set it yourself.
```
\password <Your Password>
```
## 5. Install Node, npm and Yarn
- You can find all version of those [here](https://github.com/nodesource/distributions), but my preferred is `Node.js LTS (v16.x)`

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- To install the Yarn package manager, run:
```
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
     echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn
```
