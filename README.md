# homepi
Вывод данных на коридорный терминал

# Существующий конфиг

Используемый софт
-----------------

omxplayer
  для отображения видеопотока
neofetch
  для красоты
nginx
  для отображения html файлов на сервере

```
ssh pi
su pi
```

```
.config
	- openbox
		-autostart.sh
	- chromium
	- mc
	- htop
```

autostart.sh
  запускает бразуер chromium, с определенными ключами, загружает страницу html с этого же сервера

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

/home/pi/www/homepi/index.html
  использует API яндекс карт, добавляет информер по погоде, часы
  Код в github: 
  API яндекса https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html
  
```
<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>

    <script>
    var myMap;

    // Дождёмся загрузки API и готовности DOM.
    ymaps.ready(init);

    function init () {
	// Создание экземпляра карты и его привязка к контейнеру с
	// заданным id ("map").
	myMap = new ymaps.Map('map', {
	    // При инициализации карты обязательно нужно указать
	    // её центр и коэффициент масштабирования.
        // center: [59.83671984, 30.34642999]
	    center: [59.852011, 30.310520],
	    zoom: 13,
	    controls: []
	});

	var actualProvider = new ymaps.traffic.provider.Actual({}, { infoLayerShown: true });
    // И затем добавим его на карту.
    actualProvider.setMap(myMap);

    }
    </script>

    <style>
        body, html {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
        }

        #map {
            height: 100%;
            width: 100%;
            position: absolute;
            left:0;
            right:0;
        }

        .gsInformer .gsTemp{
        font-size:12pt;
        }
    </style>

    <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed" rel="stylesheet">
    <script src="https://kit.fontawesome.com/c4a45ae419.js" crossorigin="anonymous"></script>

</head>

<body style="overflow:hidden;">

<div id="map"></div>

<div style="position:absolute;left:10px;top:10px;">
<a href="http://weather.bigmir.net/main/sankt-peterburg/6747/" target="_blank" title="Прогноз погоды в Санкт-Петербурге &#187; Россия" onclick="javascript:this.href+='?informer=1'"><img src="http://bmu.img.com.ua/informer/weather/ru/360x105/blue/rossiya/sankt-peterburg.png" width="360" height="105" alt="Прогноз погоды в Санкт-Петербурге &#187; Россия" title="Погода Санкт-Петербурге &#187; Россия" border="0" /></a>

</div>

</body>

</html>
```
  
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
работающий:
```
#!/bin/bash
while  true ; do
	omxplayer "rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/1" rtsp_transport:tcp --no-osd --live --with-info --stats
        sleep 5
done
```
Подключение к камере через браузер:
  открывает поток в VLC проигрывателе, есть попап с подвтерждением
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
