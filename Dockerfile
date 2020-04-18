from mongo:bionic
run apt-get update && apt-get install python3 python3-pip wget --yes

COPY ./blade /opt/blade
RUN pip3 install -r /opt/blade/requirements.txt
COPY entrypoint.sh .
CMD ["/entrypoint.sh"]

