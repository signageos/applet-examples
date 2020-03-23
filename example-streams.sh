
if [ ! -f video1.mp4 ]; then
	wget -O video1.mp4 https://static.signageos.io/assets/test-videos-03_AME/video-test-03_15s_1920x1080_2fe7b039750a134aeac1c0a515710007.mp4
fi

# UDP stream
ffmpeg -stream_loop -1 -i video1.mp4 -v 0 -vcodec mpeg4 -f mpegts udp://224.0.0.1:1234
ffplay udp://224.0.0.1:1234

# RTP stream
ffmpeg -stream_loop -1 -re -i video1.mp4 -an -f rtp_mpegts rtp://224.1.2.3:7000
ffplay rtp://224.1.2.3:7000

# HLS stream
ffmpeg -stream_loop -1 -i video1.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls index.m3u8
npx static-server -p 8080
ffplay http://192.168.1.135:8080/index.m3u8

# HTTP stream
npx static-server -p 8080
ffplay http://192.168.1.135:8080/video1.mp4

# UDP stream desktop
ffmpeg -stream_loop -1 -video_size 1920x1080 -framerate 25 -f x11grab -i :0.0+1920,0 -f mpegts -vcodec mpeg2video -b:v 40M udp://224.0.0.1:1234
