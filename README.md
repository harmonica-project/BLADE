# BLADE project - BLockchain Automated DEcision process

The BLADE project, for BLockchain Automated DEcision process, aims to help companies choose between available blockchains. From a set of requirements given as an input, this automated process will compute the most desirable blockchain alternative for your project. 

*This project is currently on its premises, as only a few alternatives and attributes are available, and only the CLI version is available (Web version is in development).*

## Installation

1. Make sure that Python3 is installed, as well as pip.

```bash
sudo apt-get install python3.6
sudo apt-get install python3-pip
```

2. We recommand you to create a virtual environment for your project. To do that, proceed as follows:

```bash
sudo apt-get install python3-venv
python3 -m venv .venv
source .venv/bin/activate
```

3. Then, install all required pip packages:

```bash
pip install -r requirements.txt
```

4. This project needs MongoDB to work. MongoDB is a NoSQL cross-platform document-oriented database program, working using JSON files as documents. PyMongo is already installed thanks to the previous command, but we need to set up the database. Proceed as follows:

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

*More documentation is available on MongoDB website if needed: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.*

5. Finally, we have to import the knowledge base from the knowledge-base directory available in this directory:

```bash
mongorestore -d knowledge-base knowledge-base
```

*If this is not working, use a MongoDB editor such as Robo3T or Studio3T, or the MongoDB CLI to create knowledge-base database.*

## Run

This decision process needs an input file containing all the requirements to work. Fortunately, we created one called supplychain.yaml as an example. You can edit the file to set your own requirements or create yours, following this syntax:

```yaml
# This attribute does not have any requirements, just set the weight between 0 and 1, that represents the importance of the criteria in the decision (if it helps you, in our research paper, we use a Likert scale to define the values!)
cryptocurrency:
  weight: 0
  requirements: []
  
# This attribute does have a requirement. Mandatory indicates that this attribute is required in the decision process and any alternative that does not match with that will be automatically rejected. The value field is the value required.
storageElt:
  weight: 0
  requirements:
    key: mandatory
    value: 0.8
```

To run the script from that, simply type:

```bash
python3 manual_solver.py supplychain.yaml
```

## Contact

If you have any questions, feel free to reach us at this address: nicolas.six@univ-paris1.fr!
