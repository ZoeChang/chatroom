const DARKBG = ["#860959", "#894E31", "#015564", "#002976", "#9556A3", "#123110", "#2B4B57", "#B9298A", "#485F7B", "#3D247A"];

const LIGHTBG = ["#E3E3D8", "#e26565", "#81d595", "#85D8F8", "#D8E39D", "#b0b987", "#9fdcf4", "#ECBCC9", "#ffdad3", "#B9F6D6"];

function randomBg(palette) {
    let n = Math.floor(Math.random() * 10)
    return palette[n]
}

function getElmtBychatId(attrVal) {
    let attr = `[data-chatroom="${attrVal}"]`
    let elmt = document.querySelector('#roomA').querySelector(attr)

    return elmt

}

function showSpeechBubbles(cont, v){
    // v: right=1 left=0

    // create speech bubble elememt
    let bubble = document.createElement('pre')
    bubble.textContent = cont
    bubble.style.paddingBottom = '10px'
    bubble.style.margin = '0px'

    if( v == 0){
        // youTalk style
        bubble.style.color = randomBg(LIGHTBG)
        bubble.style.textAlign = 'right'

    } else {
        bubble.style.color = randomBg(DARKBG)

    }

    // append speech bubble to chatroom
    let talks = getElmtBychatId('talks')
    talks.appendChild(bubble)

    // scroll to bottom
    let room = getElmtBychatId('room')
    let talksH = talks.getBoundingClientRect().height
    let roomH = room.getBoundingClientRect().height

    room.scrollTop = talksH > roomH ? talksH - roomH : 0

}


function sendmsg(){
    // show send msg

    // let whoTalk = this.getAttribute('data-chatroom').slice(0,-3)
    let whoTalk = 'youTalk'
    let inputcont = getElmtBychatId(whoTalk).value

    // show speech bubbles
    if( inputcont.length > 0){
        showSpeechBubbles(inputcont, 0)

        // clear input value
        getElmtBychatId(whoTalk).value = ''

        // post API
        let http = new XMLHttpRequest()
        let url = "http://training.appimc.com/frontend/ex1.php?"
        let params = `word=${inputcont}`

        http.open("POST", url, true)

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        http.responseType = 'json'

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                showSpeechBubbles(this.response.data, 1)

            }

        }

        http.send(params);
    }

}

function isEnter(e, elmt){
    if ( e.ctrlKey && e.keyCode == 13 ){
        // elmt.selectionStart = elmt.value.length
        elmt.value = elmt.value + '\n'
    } else if( !e.ctrlKey && e.keyCode == 13 ){
        sendmsg()
        return false
    }

}

// click send btn
getElmtBychatId('youTalkBtn').addEventListener("click", sendmsg)