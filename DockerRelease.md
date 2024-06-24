# --Login to Linux Server--

ssh administraor@172.16.1.226
Mbe@123$$
sudo docker ps

# --Docker Build & Push

docker build -t ahmernajam/qarhami-api-v2:latest .
docker build -t qarhami-api-v2:latest .
docker login -u ahmernajam
docker push ahmernajam/qarhami-api-v2:latest

# --Removing of last release--

sudo docker rm -f qarhami-api-v2-v1
sudo docker rmi -f ahmernajam/qarhami-api-v2:latest

# --Pulling of Latest Release--

sudo docker pull ahmernajam/qarhami-api-v2:latest
sudo docker run --name qarhami-api-v2-v1 -p 5200:3200 -itd ahmernajam/qarhami-api-v2:latest

sudo docker ps
docker run --entrypoint /bin/sh -itd mycontainer:latest

# --Auto start on Restart

sudo docker update --restart=always qarhami-api-v2-v1

------------------- COPY UPLOADS ----------------

#uploads copy
cd ~/mongobkp/uploads

## from local to container

sudo docker cp . mbe-erp-api-v21:/usr/src/app/uploads
sudo docker cp . mbe-erp-api-v32:/usr/src/app/uploads

# --Copy files to docker container--

sudo docker cp ~/mongobkp/mbe-erp/ mbe-mongo:/data/db/backups

# --Checking files in backup folder

sudo docker exec -it my-pro-app-v1 sh
cd /data/db/backups/mbe-erp
ls -lt

# --AWS

aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 590184119210.dkr.ecr.us-east-2.amazonaws.docker build -t qarhami-api-reg .
docker tag qarhami-api-reg:latest 590184119210.dkr.ecr.us-east-2.amazonaws.com/qarhami-api-reg:latest
docker push 590184119210.dkr.ecr.us-east-2.amazonaws.com/qarhami-api-reg:latest

--lb
http://qarhami-api-lb-1809598928.us-east-2.elb.amazonaws.com/
