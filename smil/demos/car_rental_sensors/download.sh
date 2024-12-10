export BASE_URL=https://demo.signageos.io/smil/demo/car-rental-sensors

download() {
    mkdir -p $(dirname $1)
    wget -O $1 $BASE_URL/$1
}

# General
download setup.jpg


# Kiosk IN
download kiosk/car-check-in-widget/css/bootstrap.css
download kiosk/car-check-in-widget/css/font-awesome.min.css

download kiosk/car-check-in-widget/fonts/fontawesome-webfont.ttf
download kiosk/car-check-in-widget/fonts/fontawesome-webfont.woff
download kiosk/car-check-in-widget/fonts/fontawesome-webfont.woff2
download kiosk/car-check-in-widget/fonts/octin_sports_rg.ttf

download kiosk/car-check-in-widget/images/barcode-scan.gif
download kiosk/car-check-in-widget/images/car1.jfif
download kiosk/car-check-in-widget/images/car2.jfif
download kiosk/car-check-in-widget/images/car3.jfif
download kiosk/car-check-in-widget/images/car4.jfif
download kiosk/car-check-in-widget/images/car5.jfif
download kiosk/car-check-in-widget/images/car6.jfif
download kiosk/car-check-in-widget/images/check-green.gif
download kiosk/car-check-in-widget/images/checkout.png
download kiosk/car-check-in-widget/images/hero-bg.png
download kiosk/car-check-in-widget/images/insurance.jpg
download kiosk/car-check-in-widget/images/thank_you.mp4

download kiosk/car-check-in-widget/libs/bootstrap.js
download kiosk/car-check-in-widget/libs/jquery-3.4.1.min.js

wget -O kiosk/car-check-in-widget/src/sos.bundle.js https://2.signageos.io/lib/front-applet/5.0.0-rc.1/bundle.js


# Kiosk OUT
download kiosk/car-check-out-widget/css/bootstrap.css
download kiosk/car-check-out-widget/css/font-awesome.min.css

download kiosk/car-check-out-widget/fonts/fontawesome-webfont.ttf
download kiosk/car-check-out-widget/fonts/fontawesome-webfont.woff
download kiosk/car-check-out-widget/fonts/fontawesome-webfont.woff2
download kiosk/car-check-out-widget/fonts/octin_sports_rg.ttf

download kiosk/car-check-out-widget/images/byebye.mp4
download kiosk/car-check-out-widget/images/flat.jpg
download kiosk/car-check-out-widget/images/gas.jpg
download kiosk/car-check-out-widget/images/hero-bg.png
download kiosk/car-check-out-widget/images/insurance.jpg
download kiosk/car-check-out-widget/images/mess.jpg

download kiosk/car-check-out-widget/libs/bootstrap.js
download kiosk/car-check-out-widget/libs/jquery-3.4.1.min.js

wget -O kiosk/car-check-out-widget/src/sos.bundle.js https://2.signageos.io/lib/front-applet/5.0.0-rc.1/bundle.js


# Display
download display/assets/keys_pickup.png
download display/assets/keys_thanks.png
download display/assets/man-720-corp.mp4
download display/assets/petersen-museum.mp4
download display/assets/pexels-gleb-albovsky-6605102.mp4
download display/assets/pexels-rodnae-productions-8783208.mp4
