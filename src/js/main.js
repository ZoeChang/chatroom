const Cpattern = ["#1c50ac", "#e26565", "#81d595", "#e5ba31", "#0f6155", "#b0b987", "#9fdcf4", "#7b29ce", "#ffdad3", "#b68c16"]

function randomBg() {
    let n = Math.floor(Math.random() * 10)
    return Cpattern[n]
}

function getElementWithAttr(attrVal) {
    let attr = `[data-chatroom="${attrVal}"]`
    let elmt = document.querySelector('#roomA').querySelectorAll(attr)

    if (elmt.length > 1)
        return elmt
    return elmt[0]

}

let custRC = getElementWithAttr('rightcell')

// class test extends custRC {
//     constructor() {
//         super()
//     }
// }

// let AAA = document.createElement(test)

function speechBubbles(cont, v) {
    // v: right=1 left=0

    // let bubbleCell = document.createElement('div')
    // let custRC = getElementWithAttr('rightcell')
    // let custLC = getElementWithAttr('leftcell')

    // bubbleCell.appendChild(custRC)

    let bubbleCont = document.createElement('span')
    let bubble

    let myBtn = document.createElement('div')
    myBtn.textContent = cont
    myBtn.style.marginBottom = '10px'
    myBtn.style.background = randomBg()


    getElementWithAttr('talkswrap').appendChild(myBtn)

    // clear input value
    getElementWithAttr('yourtalk').value = ''

}


function sendmsg() {
    // showm send msg
    // for style connect test
    let whoTalk = this.id
    let inputcont = getElementWithAttr('yourtalk').value
    if (whoTalk == 'btnA') {
        // right styel
        speechBubbles(inputcont, 1)

    } else {
        // left style
        speechBubbles(0)
    }

    // post API

}

// getElementWithAttr('btn').addEventListener("click", sendmsg)
document.getElementById('btnA').addEventListener("click", sendmsg)
document.getElementById('btnB').addEventListener("click", sendmsg)











