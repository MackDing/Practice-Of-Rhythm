'use strict';

const dino= document.querySelector('#dino')
const block=document.querySelector('#block')

window.addEventListener('keydown',  event=> {
    console.log(event)
    if (event.code === 'Space') {
        console.log('up')
        dino.classList.add('jumpClass')

        setTimeout(function () {
            dino.classList.remove('jumpClass')
        },300)
    }
})

setInterval(() => {
    const dinoBottom = parseFloat(
        getComputedStyle(dino).getPropertyValue('bottom')
    )
    const blockLeft = parseFloat(
        getComputedStyle(block).getPropertyValue('left')
    )
    if (blockLeft < 20 && blockLeft > -20 && dinoBottom < 20) {
        // block.style.animation = 'none'
        // block.style.display = 'none'
        alert('Game over!')
    }
},10)