## App made under 24 hours for an interview
- Allows you to search twitter (real-time), receive top 10 results, and allows you to drag the tweet and save it to localStorage.

### To run the app:
- open index.html (with a web browser)

### To code:
- npm install
- gulp dev (or just 'gulp' if you don't like auto-reload)
- open index.html

### NOTES:
- Browsers working correctly: (Opera, Chrome, Firefox) in MAC OSX, Windows 10. 
	- 	Assume latest editions
- ( > IE 11, Edge)
	- 	There is a problem in regards to localStorage serving elements from local file system (or localhost if run using ‘gulp dev’). Apparently it should work if hosted on a server. However, I do not have a windows machine, so had a tough time trying to debug further.
- (Safari 10+ on OSX)
	-	May have to open developer window and disable cross origin restrictions. Bug on Safari’s end, it is filed and logged. Not sure of workaround.
