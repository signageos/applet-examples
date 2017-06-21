
# Example of using sOS inside <iframe/>
Sometimes it's necessary to use iframes in your applet.
Because of safe policy it is not possible to comunicate using window.parent.contentWindow.sos.* etc.
You can still use sOS JS API inside the iframes by addding simple snippet in every of your iframe.
It is also possible to use iframe in iframe. Only you need is add following snippet in every iframe on way from top applet to iframe.
Snippet should be the last script in body tag.

For applet configuration let's specify `baseUrl` default to http://localhost:3333
Start testing server using `npm start`.

```ts
<script type="application/javascript">
// sOS JS API loader
!function(){window.addEventListener("message",function(t){if(t.source===window.parent&&"hug.api_js_uri"===t.data.type){var e=t.data.uri;if(!e)throw new Error("Front applet JS is not set.");var a=document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("src",e),a.onload=a.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(window.sos.apiJsUri=t.data.uri,window.dispatchEvent(new Event("hug.loaded")),window.dispatchEvent(new Event("sos.loaded")))},document.head.appendChild(a)}}),window.parent.postMessage({type:"hug_loader.ready"},"*")}();
</script>
```

API Reference is located in our documentation <https://docs.signageos.io/api/sos-applet-api#iframes>
