#!/bin/bash
npm install
npm run compile
mkdir _TMP_DEB
mkdir _TMP_DEB/etc
mkdir _TMP_DEB/etc/init.d
mkdir _TMP_DEB/opt
mkdir _TMP_DEB/opt/node-scheduler
ln -s /opt/node-scheduler/initd-runner.sh _TMP_DEB/etc/init.d/node-scheduler
cp -r ./node_modules _TMP_DEB/opt/node-scheduler
cp -r ./jobs-available _TMP_DEB/opt/node-scheduler
cp -r ./jobs-enabled _TMP_DEB/opt/node-scheduler
cp -r ./lib _TMP_DEB/opt/node-scheduler
cp -r ./*.sh _TMP_DEB/opt/node-scheduler
cp -r ./DEBIAN _TMP_DEB/
chmod a+x _TMP_DEB/DEBIAN/control
chmod a+x _TMP_DEB/opt/node-scheduler/*.sh
dpkg-deb --build _TMP_DEB
#rm -rf _TMP_DEB/DEBIAN # comment for debug
cd _TMP_DEB && zip -r node-scheduler.zip . && mv node-scheduler.zip ../ && cd ..
rm -rf _TMP_DEB
mv _TMP_DEB.deb node-scheduler.deb
