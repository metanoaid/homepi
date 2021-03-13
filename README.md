# Homepi

Вывод данных на коридорный терминал

* [Форум RaspBerry Pi](https://www.raspberrypi.org/forums/)
* [Документация по VLC](https://wiki.videolan.org/Documentation:Command_line/)
* [Документация по Chromium](https://www.chromium.org/Home)
* [Документация по Openbox](http://openbox.org/wiki/Main_Page)
* [API яндекс карт](https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html)
* [Кабинет developer Yandex](https://developer.tech.yandex.ru/services/)
* [Генератор crontab](https://crontab.guru/#*_*_*_*)

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
* Raspbian GNU/Linux 10 (buster) armv7l
  * deb-src http://raspbian.raspberrypi.org/raspbian/ buster main contrib non-free rpi
  * deb http://archive.raspberrypi.org/debian/ stretch main ui
>  * *fixme* судя по всему еще yandex репозитории, проверить

# Уровень soft

* neofetch
* lightdm // менеджер входа в систему - в конфиге задан openbox
* openbox
* mc
* htop
* nginx
* git
* chromium-browser // /usr/bin/chromium   -> traditional package (через https://github.com/scheib/chromium-latest-linux.git)
* unclutter // hide the cursor
* vlc
* ncdu
* crontab
* xdotool // необходимо сказать `export DISPLAY=":0"` перед началом xdotool key 'F5' (вносим в .profile в home пользователя или в sh скрипте reload)

# Уровень скриптов

Подключение с локальных устройств через ssh ключ к адресу: 192.168.0.21 по 22 порту. Ключевые настройки выполняются от пользователя pi (12345), код веб и потока с камеры находится в данном репозитории.

Используются скрипты:
* создана жесткая ссылка из /home/pi/homepi/autostart.sh в /home/pi/.config/openbox/autostart.sh (для возможности хранения скрипта в git репо)
* скрипт автозапуска программного обеспечения (указанного ниже) ~/.config/openbox/autostart.sh
* веб-страницы /home/pi/homepi/index.html, использует API yandex, добавляет информер по погоде, часы
* видеопоток с камеры
  * rtsp://192.168.0.20:554
  * rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/2 (работает sub stream 640 480: substream 640 480 MJPEG 25)
  * http://admin:22sS8XQtKv@192.168.0.20/Streaming/Channels/1/picture (статичная картинка)
  * rtsp://192.168.0.20:554/mpeg4 (MPEG4)
* reload, запущен через крон

crontab запускается от pi и нажимает F5 раз в минуту, пишет лог в /home/pi/tmp.cron (есть пустая строчка после записи крона)
```
crontab -e
*/5 * * * * /home/pi/homepi/reload.sh 2>/home/pi/tmp.cron

```

## Скрипт автозапуска autostart.sh

Запускает браузер, скрипт с видео и управляет энергопитанием монитора

* xset s noblank // tells to X server to not blank the video device.
* xset s off // выключает screensaver
* xset s -dpms // disables the DPMS ([Display Power Management Signaling](https://en.wikipedia.org/wiki/VESA_Display_Power_Management_Signaling))

[Отключение dpms навсегда через lightdm](https://www.geeks3d.com/hacklab/20160108/how-to-disable-the-blank-screen-on-raspberry-pi-raspbian/)

unclutter -idle 0.5 -root & // удаляет курсор с экрана

## Скрипт запуска видеопотока camera.sh

внести:
```
cvlc "rtsp://192.168.0.20:554" --no-audio --no-fullscreen --video-on-top --no-video-title-show
cvlc "rtsp://192.168.0.20:554/mpeg4" --no-audio --no-fullscreen --video-on-top --no-video-title-show
```

```
--no-audio // выключает звук
--fullscreen // sets fullscreen video
--no-fullscreen
--video-on-top
--no-video-title-show
--width, --height <integer> sets the video window dimensions. By default, the video window size will be adjusted to match the video dimensions
--aspect-ratio <mode> forces source aspect ratio. Modes are 4x3, 16x9
```

# Что можно выводить на панель
```
chromium-browser http://admin:22sS8XQtKv@192.168.0.20:80/Streaming/Channels/101/picture --kiosk --start-fullscreen

Аналоги: ZoneMinder
Можно выводить нагрузку на wifi сеть
потребление воды, электричество
температуру в доме с датчиков
```

# Обновление PI

Все от root или sudo, при нехватке места
```
du / | sort -n
apt purge somesoft
raspi-config 
rm -rf /user/share/doc
lsblk
ncdu / 
rm -rf ~/.cache/chromium
```

```
apt update
apt dist-upgrade -y
sudo rpi-update // обновить прошивку
vim /etc/apt/sources.list
stretch > buster
apt autoremove -y
apt autoclean // apt clean
reboot
raspi-config // конфигурирование RaspBerryPi
```

# Использование git

Репозиторий homepi.git, репозиторий склонирован на сервер PI и на macon макбук.

при работе на сервере
```
git pull
// вводим креды github
git add
git commit -am 'commit's text'
git push
// вводим креды github
```
