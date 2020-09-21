FROM mongo:bionic
RUN apt-get update && apt-get install python3 python3-pip wget --yes
COPY ./requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt
COPY . /blade/api
COPY entrypoint.sh /blade
EXPOSE 5000
CMD ["/blade/entrypoint.sh"]

