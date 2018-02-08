# chatroom.js
simple chartroom used pure JS.

### Simple introduction
- srcoll to bottom while show new message
- random text color
- press `Enter` to send message
    support to make a new line by press `Ctrl` + `Enter` in input field

### Simple usage
refer to  `chatroom.js` and make an entry somewhere in your HTML file as below:
```
<div id="your_room_id"></div>
```
and run:
```
var room = document.querySelector('#your_room_id')
var myRoom = new Chatroom(room)
```