mongod  2>&1 1>/dev/null & 
cd /opt/blade
mongorestore -d knowledge-base knowledge-base --quiet
python3 manual_solver.py myrequest.yaml