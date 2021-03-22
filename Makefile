stop:
	docker rm -f blade-api |true
	docker rm -f blade-front |true

build:
	docker build blade/api -t bladesorbonne/blade-img-api
	docker build blade/front -t bladesorbonne/blade-img-front

run:
	docker run -it --name blade-api -d -p 5000:5000 bladesorbonne/blade-img-api
	docker run -it --name blade-front -d -p 3000:3000 bladesorbonne/blade-img-front

push:
	docker push bladesorbonne/blade-img-api
	docker push bladesorbonne/blade-img-front

