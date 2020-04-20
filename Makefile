build:
	docker build . -t nherbaut/blade

run:
	docker run -d -p 5000:5000 nherbaut/blade 
