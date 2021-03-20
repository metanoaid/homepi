#!/bin/bash
while  true ; do
	cvlc rtsp://admin:22sS8XQtKv@192.168.0.20:554 --no-audio --no-fullscreen --video-on-top --no-video-title-show --no-embedded-video --width=480 --height=320 --video-x=100 --video-y=100
	sleep 5
done
