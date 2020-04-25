stop:
	docker rm -f blade |true

build:
	docker build . -t blade-img

run:
	docker run  --name blade -d -p 5000:5000 blade-img
