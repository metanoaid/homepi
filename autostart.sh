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

#/home/pi/homepi/camera.sh&

xset s noblank
xset s off
xset s -dpms