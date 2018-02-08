const DARKBG = ["#860959", "#894E31", "#015564", "#002976", "#9556A3", "#123110", "#2B4B57", "#B9298A", "#485F7B", "#3D247A"];

const LIGHTBG = ["#E3E3D8", "#e26565", "#81d595", "#85D8F8", "#D8E39D", "#b0b987", "#9fdcf4", "#ECBCC9", "#ffdad3", "#B9F6D6"];

function randomBg(palette) {
    let n = Math.floor(Math.random() * 10)
    return palette[n]
}

function getElmtByChartId(attrVal) {
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

    // append speech bubble to chartroom
    let talks = getElmtByChartId('talks')
    talks.appendChild(bubble)

    // scroll to bottom
    let room = getElmtByChartId('room')
    let talksH = talks.getBoundingClientRect().height
    let roomH = room.getBoundingClientRect().height

    room.scrollTop = talksH > roomH ? talksH - roomH : 0

}


function sendmsg(){
    // show send msg

    // let whoTalk = this.getAttribute('data-chatroom').slice(0,-3)
    let whoTalk = 'youTalk'
    let inputcont = getElmtByChartId(whoTalk).value

    // show speech bubbles
    if( inputcont.length > 0){
        showSpeechBubbles(inputcont, 0)

        // clear input value
        getElmtByChartId(whoTalk).value = ''

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
getElmtByChartId('youTalkBtn').addEventListener("click", sendmsg)






function TalkBoard(){
    let outer = document.createElement('div')
    outer.style.borderStyle = 'solid'
    outer.style.borderWidth = '1px'
    outer.style.borderColor = '#e9e9e9'
    outer.style.width = '500px'
    outer.style.height = '500px'
    outer.style.backgroundColor = 'aliceblue'
    outer.style.overflow = 'auto'
    outer.dataset.chatroom = 'room'

    let board = document.createElement('div')
    board.dataset.chatroom = 'talks'


    outer.appendChild(board)

    return outer

}

class InputField {
    constructor(){
        let wrap = document.createElement('div')

        // lable
        let label = document.createElement('label')
        label.textContent = 'U say:'

        wrap.appendChild(label)

        // textarea
        let textarea = document.createElement('textarea')
        textarea.style.width = '250px'
        textarea.dataset.chatroom = 'youTalk'
        textarea.onkeypress = this.isEnter

        wrap.appendChild(textarea)

        // button
        let btn = document.createElement('button')
        btn.textContent = 'Send'
        btn.dataset.chatroom = 'youTalkBtn'
        btn.onclick = this.sendMsg

        wrap.appendChild(btn)

        this.htmldom = wrap
    }

    isEnter(e){
        if ( e.ctrlKey && e.keyCode == 13 ){
            // press Ctrl + Enter to add new line

            e.target.value = e.target.value + '\n'

        } else if( !e.ctrlKey && e.keyCode == 13 ){
            // press Enter to send msg

            // sendmsg()
            return false
        }

    }

    sendMsg(){
        // show send msg

        let whoTalk = 'youTalk'
        let inputcont = this.getElmtByChartId(whoTalk).value

        // show speech bubbles
        if( inputcont.length > 0){
            showSpeechBubbles(inputcont, 0)

            // clear input value
            this.getElmtByChartId(whoTalk).value = ''

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

    getElmtByChartId(attrVal) {
        let attr = `[data-chatroom="${attrVal}"]`
        let elmt = document.querySelector('#roomA').querySelector(attr)

        return elmt

    }



}

class Chartroom {
    constructor(room){
        this.room = room
    }

    main(){
        this.createRoom()
    }

    createRoom(){
        // create talks board
        let talkboard = TalkBoard()

        this.room.appendChild(talkboard)

        // create input area
        let inputField = new InputField()

        this.room.appendChild(inputField.htmldom)
    }
}