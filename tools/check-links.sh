#!/bin/bash

usage() {
	echo "This script checks all links in the documentation." >&2
	echo >&2
	echo "Usage: $0 [-h]" >&2
	echo "  -h  Show this help" >&2
	exit 1
}

while getopts "h" opt; do
	case $opt in
		h) usage;;
		*) usage;;
	esac
done

skipUrls=(
	"http://192.168.1.239/live/Play1.m3u8"
	"http://192.168.1.135:8080/video1.mp4"
	"http://192.168.10.20:9999"
	"http://192.168.1.135:8080"
	"https://www.rmp-streaming.com"
	"https://docs.signageos.io/hc/en-us/articles/" # It's 403 in curl but works
	"https://www.signageos.io/html-content.html" # Example of 404 HTML content
	"https://demo.signageos.io/smil/zones/play/report"
	"https://github.com/signageos/ng-app-example.git"
	"https://gitlab.com/signageos/applet-examples"
	"https://box.signageos.io/settings"
	"https://box.signageos.io/organizations"
	"https://box.signageos.io/organization/__FILL_YOUR_ORGANIZATION_UID__/API%20tokens"
	"https://box.signageos.io/device/__FILL_DEVICE_UID_TO_TEST_ON__/testing"
	"http://some.uri/licence-uri"
	"http://www.protractortest.org"
	"http://help.github.com/ignore-files/"
	"http://localhost"
	"https://twitter.com"
	"http://www.w3.org"
	"https://gitter.im"
	"https://angular.io"
	"https://youtube.com"
	"https://cli.angular.io"
	"https://go.microsoft.com"
	"https://material.angular.io"
	"https://discord.gg"
	"https://help.github.com"
	"https://facebook.github.io"
	"https://reactjs.org"
	"https://developers.google.com"
	"https://bit.ly"
	"https://forum.vuejs.org"
	"https://chat.vuejs.org"
	"https://github.com/vuejs/vue-devtools"
	"https://cdn.your-cms.com"
	"https://upload-screenshot.your-cms.com"
	"http://schemas.adfotain.org"
	"http://nexmosphere.com"
	"https://github.com/twbs/bootstrap"
	"http://fontawesome.io"
	"http://feross.org"
)

checkLink() {
	link=$1
	if [[ $link == http* ]]; then
		curl -s -L --head $link | grep "HTTP/.* [2].." > /dev/null
		if [ $? -ne 0 ]; then
			echo "  $link is broken" >&2
		fi
	fi
}

# Get all links in a file (remove ' and " characters when wrapping the link)
getFileLinks() {
	filePath=$1
	grep -o -E "['\"]?http[s]?://[^)]+" $filePath | sed -e "s/['\"\,;<>]//g"
}

isSkipedUrl() {
	url=$1
	for skipUrl in "${skipUrls[@]}"; do
		if [[ $url =~ $skipUrl ]]; then
			return 0
		fi
	done
	return 1
}

checkFileLinks() {
	hasError=0
	filePath=$1
	for link in $(getFileLinks $filePath); do
		#echo " Checking $link" >&2
		if isSkipedUrl $link; then
			continue
		fi
		checkLink $link
		if [ $? -ne 0 ]; then
			hasError=1
			echo "  $link is broken" >&2
		fi
	done

	if [ $hasError -ne 0 ]; then
		return 1
	fi
}

# Check links in the documentation
for filePath in $(find . -type f -not -path "*/node_modules/*" -not -path "./smil/*" -not -path "./.git/*" -not -path "*/.angular/*" -not -path "*/package-lock.json"); do
	echo "Checking links in $filePath" >&2
	checkFileLinks $filePath

	if [ $? -ne 0 ]; then
		exit 1
	fi
done
