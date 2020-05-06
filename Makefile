stop:
	docker rm -f blade |true

build:
	docker build . -t bladesorbonne/blade-img

run:
	docker run  --name blade -d -p 5000:5000 bladesorbonne/blade-img

push:
	docker push bladesorbonne/blade-img


