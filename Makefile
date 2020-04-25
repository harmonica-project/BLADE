stop:
	docker rm -f blade |true

build:
	docker build . -t nherbaut/blade

run:
	docker run  --name blade -d -p 5000:5000 nherbaut/blade 
