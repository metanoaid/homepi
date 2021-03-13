# homepi

Вывод данных на коридорный терминал

* [Форум RaspBerry Pi](https://www.raspberrypi.org/forums/)
* [Документация по VLC](https://wiki.videolan.org/Documentation:Command_line/)

# Физические устройства

* Камера:
* Монитор:
* Сервер: Raspberry Pi 2 Model B Rev 1.1
  * CPU: ARMv7 rev 5 (v7l) (4) @ 0.9GHz
  * Memory: 310MB / 925MB
  * DISK: карта mmcblk 3.8Gb
* Используется сетевые устройства:

# Уровень OS

* Прошивка (BIOS): rpi-5.10.y
* Kernel: 4.19.66-v7+
* Raspbian GNU/Linux 9.13 (stretch) armv7l
  * (#deb-src http://raspbian.raspberrypi.org/raspbian/ buster main contrib non-free rpi)
  * *fixme* судя по всему еще yandex репозитории, проверить

# Уровень soft

* neofetch
* openbox
* mc
* htop
* nginx, root диркетория /home/pi/www/homepi/
* git
* chromium-browser
* unclutter (hide the cursor)
* vlc

# Уровень скриптов

Подключение с локальных устройств через ssh ключ к адресу: 192.168.0.21 по 22 порту. Ключевые настройки выполняются от пользователя pi (12345), код веб и потока с камеры находится в данном репозитории.

Используется 3 скрипта:
* скрипт автозапуска программного обеспечения (указанного ниже) ~/.config/openbox/autostart.sh *сделать симлинк на файл в репозитории*
* веб-страницы /home/pi/www/homepi/index.html, использует [API яндекс карт](https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html), добавляет информер по погоде, часы
* видеопоток с камеры



```
chromium-browser \
    --no-first-run \
    --disable \
    --disable-translate \
    --disable-infobars \
    --disable-suggestions-service \
    --disable-save-password-bubble \
    --start-maximized \
    --kiosk \
    -app="http://192.168.0.21/index.html" &

/home/pi/Video.sh&

xset s noblank
xset s off
xset s -dpms
```
xset s noblank // tells to X server to not blank the video device.
xset s off // выключает screensaver
xset s -dpms // disables the DPMS ([Display Power Management Signaling](https://en.wikipedia.org/wiki/VESA_Display_Power_Management_Signaling))

  
Video.sh

старый:
```
#!/bin/bash
while  true ; do
        #omxplayer rtsp://192.168.0.20/live --win 1560,0,1960,640 --orientation 90
        omxplayer rtsp://192.168.0.20:554/Streaming/Channels/1 --win 1560,0,1960,640 --threshold 0.5 --orientation 90 --live
        #omxplayer rtsp://192.168.0.20/live --win 1280,0,1960,360
	#omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/1" rtsp_transport:tcp --no-osd --live --with-info --stats
        sleep 5
done
```
работающий старый 2:
```
#!/bin/bash
while  true ; do
	omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/1" rtsp_transport:tcp --no-osd --live --with-info --stats
        sleep 5
done
```



Подключение к камере через браузер:
  открывает поток в VLC проигрывателе, есть попап с подтверждением
```
rtsp://192.168.0.20:554
```

Файлик с линками
```
chromium-browser

http://admin:12345@192.168.0.20:80/Streaming/Channels/101/picture
http://admin:12345@192.168.0.20:80/S

cvlc "rtsp://192.168.0.20:554" --no-audio --no-fullscreen --video-on-top --no-video-title-show

# не работает killall -9 chromium-browser

chromium-browser http://admin:12345@192.168.0.20:80/Streaming/Channels/101/picture --kiosk --start-fullscreen


rtsp://192.168.0.20:554/mpeg4


omxplayer -i "rtsp://admin:22sS8XQtKv@192.168.0.20:554/mpeg4"


# вот это работает - проблема была в udp вместо tcp по ходу
omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554" --avdict rtsp_transport:tcp --no-osd --live --with-info --stats

Description of parameters:

--avdict rtsp_transport:tcp was used because I experienced significant packet loss with the default UDP transport, which periodically caused the bottom half of the video to be overrun with artefacts.

--no-osd removes some annoying logging output on the terminal.

--live because this is a live stream - but I didn’t notice any difference…

--with-info outputs some stream information before the video starts playing.

--stats outputs ongoing information.

In addition, there is a --refresh parameter which will change the output resolution and frame rate to match the video (apparently, but I noticed no change). However, it is dangerous because if omxplayer does not exit gracefully (i.e. press q not <CTRL>-c), then the screen will just be black!

#!/bin/bash
while  true ; do
        #omxplayer rtsp://192.168.0.20/live --win 1560,0,1960,640 --orientation 90
        omxplayer rtsp://192.168.0.20:554/Streaming/Channels/1 --win 1560,0,1960,640 --threshold 0.5 --orientation 90 --live
        #omxplayer rtsp://192.168.0.20/live --win 1280,0,1960,360
        sleep 5
done


omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554" --avdict rtsp_transport:tcp --no-osd --live --win 1560,0,1960,640 --threshold 0.5 --orientation 90

omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/2" --avdict rtsp_transport:tcp --no-osd --live --with-info --stats


# работает sub stream 640 480: substream 640 480 MJPEG 25
rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/2
```

http фотка статичная стрим работающий

```
http://admin:22sS8XQtKv@192.168.0.20/Streaming/Channels/1/picture
```

Обновление PI

```
apt update
apt dist-upgrade -y
sudo rpi-update // обновить прошивку
vim /etc/apt/sources.list
stretch > buster


```
