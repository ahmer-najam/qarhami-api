# API RELEASE ON DOCKER

# --Image Building--

<!-- docker build -t qarhami-api:latest . -->

docker build --pull --rm -f "Dockerfile" -t qarhami-api:latest "."

# --Image Pushing to Docker Hub--

docker image push ahmernajam/qarhami-api:latest

docker image push docker.io/ahmernajam/qarhami-api:latest

# --Login to Linux Server--

ssh root@103.143.76.45
Yahoo@786

# --Removing of last release--

sudo docker rm -f qarhami-api-v1
sudo docker rmi ahmernajam/qarhami-api:latest

# --Pulling of Latest Release--

sudo docker pull ahmernajam/qarhami-api:latest
sudo docker run --name qarhami-api-v1 -p 3200:3200 -itd ahmernajam/qarhami-api:latest
sudo docker ps
docker run --entrypoint /bin/sh -itd mycontainer:latest

# --Auto start on Restart

sudo docker update --restart=always qarhami-api-v1

------------------- COPY UPLOADS ----------------

#uploads copy
cd ~/mongobkp/uploads

## from local to container

sudo docker cp . qarhami-api-v1:/usr/src/app/uploads

## from container to local

sudo docker cp qarhami-api-v1:/usr/src/app/uploads/. ~/mongobkp/uploads

------------------- BACKUP & RECOVERY ----------------

# BACKUP OF MONGODB

# --Backup script

sudo docker exec mbe-mongo mongodump --db mbe-erp --out /data/db/backups
sudo docker cp mbe-mongo:/data/db/backups ~/mongobkp
#sudo rclone copy ~/mongobkp/ gdrive2:/mongobkp/
rm _.zip
timestamp=$(date +'%Y%m%d%H%M%S')
zip_filename="${timestamp}\_mbeerp.zip"
cd ~/mongobkp/backups/
rm _.zip
zip -r "$zip_filename" .
sudo rclone copy "$zip_filename" gdrive2:/mongobkp/

# BACKUP RESTORATION OF MONGODB

# --Downloading files through wget from Google-Drive--

# -- NOTE: Backup file should be shared as public

wget -O wget_output.zip "https://drive.google.com/uc?export=download&id=FILE_ID"

unzip wget_output.zip

# --Copy files to docker container--

sudo docker cp ~/mongobkp/mbe-erp/ mbe-mongo:/data/db/backups

# --Checking files in backup folder

sudo docker exec -it mbe-mongo bash
sudo docker exec -it qarhami-api-v1 bash
sudo docker exec -it sql bash
cd /data/db/backups/mbe-erp
ls -lt

# --Restoration of database

mongorestore --db mbe-erp-bkp4 /data/db/backups/mbe-erp

# --syntax -- db restoration

mongorestore --db DATABASE_NAME PATH_OF_DB_BACKUP
