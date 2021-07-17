Что было во время отпуска
--------------------------
Менялся IP адрес с белого на серый

В сети при сбросе настроек на дефолтные 3 разных типа сетей. У камеры 192.0.0.64, у свитча 192.168.1.1, у роутера 192.168.0.1
Поэтому приходится переключатся изначально между разными сетками, настраивать локальные статики IP, а затем переходить на общую сеть

Проблемы
--------
FIXED закончилось место на pi?
    почистил
FIXED не работает киоск с пробками
    починил - проблема была в отсутствии свободного места на диске и удалился хардлинк автостарта в openbox

FIXED Не работает видеокамера
    ресетнул, вернул сетевой адрес одной сети
FIXED не войти на свитч
    ресетнул, вернул сетевой адрес одной сети



Действия log
-------------
Обновил роутер до последней версии
найден dd wrt
Убрал правила маршрутизации
обновил отдельную сборку chromium на pi
Сделал nmap 192.168.0.0/24 - не вижу камеры, не вижу свитча
обновил pi? нет - место закончено
переткнул камеру в 2 порт роутера напрямую - вернул обратно
почистил pi - удалил локальную сборку chromium rm -rf

Тк камера сбросилась - адрес 192.0.0.64 дефолтный, admin 12345
меняем домашнюю сеть роутера на 192.0.0.1
камера появилась по дефолтному адресу - поменяли ей сеть на 192.168.0.0/24 - ребутнулась и пошла в новую сеть

проверим свитч - меняем роутер на 192.168.1.2, по 1.1. отвечает AT-GS950/24 manager / friend (в хроме, тк в сафари не работают менюхи)
меняем на статик 192.168.1.2

на роутере меняем обратно сеть

Дальше
------
все процессы ps -eF


vlc rtsp://admin:22sS8XQtKv@192.168.0.20:554
cvlc rtsp://admin:22sS8XQtKv@192.168.0.20:554
--no-embedded-video


--autoscale
--no-embedded-video 

--no-video-title-show --no-video-deco 
--width=1024 --height=1024

vlc --no-video-deco --no-embedded-video

 --video-x=300 --video-y=300 --no-audio 
 --video-x=X --video-y=Y

Удалить бы pulse audio

[6ca01f98] glconv_vaapi_x11 gl error: vaInitialize: unknown libva error
[6ca01f98] glconv_vaapi_drm gl error: vaInitialize: unknown libva error
Failed to open VDPAU backend libvdpau_vc4.so: cannot open shared object file: No such file or directory

[7360cb78] avcodec decoder error: more than 5 seconds of late video -> dropping frame (computer too slow ?)
[h264 @ 0x6bc8fa40] illegal short term buffer state detected
[h264 @ 0x6bca7f90] mmco: unref short failure

меням конфиг vlc /home/pi/.config/vlc/vlc-qt
1440 793
1024 768

В настройках камеры в основном потоке меняем отдачу на 1280 на 720 (меньше нет)
    основной поток уже не плохо )
в дополнительном потоке можно меньше! 

cvlc -v rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/2

[7360c1b8] avcodec decoder warning: More than 11 late frames, dropping frame
[6d07b780] main video output warning: picture is too late to be displayed (missing 574 ms)

для карты пойдет вторичный поток 352 х 288

cvlc rtsp://admin:22sS8XQtKv@192.168.0.20:554/Streaming/Channels/1

Короче, решение было следующее - настроить поток надо было в настройках камеры через веб-интерфейс, чтобы оно отдавало меньше. Основной поток подходит при варианте когда только камера (центрует по середине), вторичный поток подойдет для карты, только не совсем понятно как его отцентровать, тк ключи не работают.

Но теперь по-крайней мере, работает камера как глазок
