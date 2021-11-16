# Car Rental Demo - Display part

**Components:**  
Samsung QMH running [signageOS SMIL Player](https://github.com/signageos/smil-player) with attached:

- RFID Sensor (pickup/place, by [Nexmosphere](http://nexmosphere.com/))
- Gender Sensor (by [Nexmosphere](http://nexmosphere.com/))
- connected via serial-HID cable

## signageOS SMIL Player Playlist

signageOS SMIL Player drives the whole Display part experience. Defined [SMIL Playlist](kiosk-smil.smil) features:
- gapless video playlist
- triggered video playlist
- gender sensor (via HID)
- RFID sensor (via HID)

### Triggers and Sensors

Trigger and sensor definition on Display are using HID (Human Interface Device) cable acting as keyboard (due to the lack of serial communication support on Tizen displays).

You can define keyboard triggers as below:

``` xml
<!-- TRIGGER definition in the SMIL file -->
<triggers>
    <!-- triggers based on Nexmosphere gender sensor -->
    <trigger id="triggerGenderManTrigger" condition="or">
        <condition
                origin="keyboard"  data="X001BAlt81M" action="keydown"/>
    </trigger>
    <trigger id="triggerGenderWomanTrigger" condition="or">
        <condition
                origin="keyboard"  data="X001BAlt81F" action="keydown"/>
    </trigger>
    <!-- triggers based on RFID sensor -->
    <trigger id="triggerKeysPlacedDown" condition="or">
        <condition
                origin="keyboard"  data="XRAlt8PB001" action="keydown"/>
    </trigger>
    <trigger id="triggerKeysPickedUp" condition="or">
        <condition
                origin="keyboard"  data="XRAlt8PU001" action="keydown"/>
    </trigger>
</triggers>
```

You can learn more about triggers and sensors in the [signageOS SMIL Player documentation](https://docs.signageos.io/category/smil-guides/smil-guides/smil-docs-guides)

### Triggered Content 

``` xml
<!-- Standard playlist of 2 videos, playing as default -->
<par>
    <seq repeatCount="indefinite">
        <video src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/pexels-gleb-albovsky-6605102.mp4" id="annons0" fit="hidden" region="main">
            <param name="cacheControl" value="auto" />
        </video>
        <video src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/pexels-rodnae-productions-8783208.mp4" id="annons0" fit="hidden" region="main">
            <param name="cacheControl" value="auto" />
        </video>
    </seq>
</par>

<!--  Triggered playlist of 1 video, playing if trigger `triggerGenderManTrigger` is active -->
<par>
    <seq begin="triggerGenderManTrigger" repeatCount="1">
        <video src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/petersen-museum.mp4" id="annons0" fit="hidden" region="main">
            <param name="cacheControl" value="auto" />
        </video>
    </seq>
</par>

<!--  Triggered playlist of 1 video, playing if trigger `triggerGenderWomanTrigger` is active -->
<par>
    <seq begin="triggerGenderWomanTrigger" repeatCount="1">
        <video src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/petersen-museum.mp4" id="annons0" fit="hidden" region="main">
            <param name="cacheControl" value="auto" />
        </video>
    </seq>
</par>

<!-- 
    Triggered playlist of 1 overlay image, playing if trigger `triggerKeysPlacedDown` is active 
    In our example in case we place keys on the RFID antenna.
-->
<par>
    <seq begin="triggerKeysPlacedDown" repeatCount="1">
        <img src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/keys_pickup.png" id="annons1" dur="35s" fit="hidden" region="keyPickup">
            <param name="cacheControl" value="auto" />
        </img>
    </seq>
</par>

<!-- 
    Triggered playlist of 1 overlay image, playing if trigger `triggerKeysPickedUp` is active 
    In our example in case we pick up keys from the RFID antenna.
-->
<par>
    <seq begin="triggerKeysPickedUp" repeatCount="1">
        <img src="https://signageos-demo.s3.eu-central-1.amazonaws.com/smil/demo/car-rental-sensors/display/assets/keys_thanks.png" id="annons1" dur="15s" fit="hidden" region="keyPickup">
            <param name="cacheControl" value="auto" />
        </img>
    </seq>
</par>
```
