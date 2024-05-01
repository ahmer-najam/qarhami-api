# API RELEASE ON DOCKER

# --Image Building--

<!-- docker build -t qarhami-api:2.1 . -->

docker build --pull --rm -f "Dockerfile" -t qarhami-api:2.1 "."

# --Image Pushing to Docker Hub--

docker image push ahmer4najam/qarhami-api:2.1

docker image push docker.io/ahmer4najam/qarhami-api:2.1

# --Login to Linux Server--

ssh administraor@172.16.1.226
Mbe@123$$

# --Removing of last release--

sudo docker rm -f qarhami-api1
sudo docker rmi ahmer4najam/qarhami-api:2.1


# --Pulling of Latest Release--

sudo docker pull ahmer4najam/qarhami-api:2.1
sudo docker run --name qarhami-api1 -p 3600:3600 -itd ahmer4najam/qarhami-api:2.1
sudo docker ps
docker run --entrypoint /bin/sh -itd mycontainer:latest

# --Auto start on Restart
sudo docker update --restart=always qarhami-api1

------------------- COPY UPLOADS ----------------

#uploads copy
cd ~/mongobkp/uploads
## from local to container
sudo docker cp . qarhami-api1:/usr/src/app/uploads
## from container to local
sudo docker cp qarhami-api1:/usr/src/app/uploads/.  ~/mongobkp/uploads

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
sudo docker exec -it qarhami-api1 bash
sudo docker exec -it sql bash
cd /data/db/backups/mbe-erp
ls -lt

# --Restoration of database

mongorestore --db mbe-erp-bkp4 /data/db/backups/mbe-erp

# --syntax -- db restoration

mongorestore --db DATABASE_NAME PATH_OF_DB_BACKUP
