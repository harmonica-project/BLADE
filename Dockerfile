from mongo:bionic
run apt-get update && apt-get install python3 python3-pip wget --yes
COPY ./blade/requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt
COPY ./blade /opt/blade
COPY entrypoint.sh /opt
CMD ["/opt/entrypoint.sh"]

