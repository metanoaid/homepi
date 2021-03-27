#!/bin/bash
while  true ; do
	cvlc -v rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/2 --width=640 --height=480 --video-x=300 --video-y=300 --no-audio --no-video-title-show
	sleep 5
done
