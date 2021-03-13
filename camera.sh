#!/bin/bash
while  true ; do
        #omxplayer rtsp://192.168.0.20/live --win 1560,0,1960,640 --orientation 90
        #omxplayer rtsp://192.168.0.20:554/Streaming/Channels/1 --win 1560,0,1960,640 --threshold 0.5 --orientation 90 --live
        #omxplayer rtsp://192.168.0.20/live --win 1280,0,1960,360
	#omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/1" rtsp_transport:tcp --no-osd --live --with-info --stats
	vlc rtsp://admin:22sS8XQtKv@192.168.0.20:554
        sleep 5
done
