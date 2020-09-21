mongod  2>&1 1>/dev/null & 
cd /blade/api
mongorestore -d knowledge-base knowledge-base --quiet
python3 /blade/api/blade_runner_api.py

