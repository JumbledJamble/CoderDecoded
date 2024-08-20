const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "123456789";

const alphabet = katakana + letters + numbers;
const fontSize = 14;
// figure out all possible columns
const columns = canvas.width/fontSize;
const height = canvas.height;

let streams = [{
    chars : null,
    current : null,
    column : null,
    height : null,
    timer : 4,

},{
    chars : null,
    current : null,
    column : null,
    height : null,
    timer : 3,
},{
    chars : null,
    current : null,
    column : null,
    height : null,
    timer : 2,
},{
    chars : null,
    current : null,
    column : null,
    height : null,
    timer : 1,
}]


const drawStreams = () => {

    // draw clear opaque black rect
	ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    
	ctx.fillRect(0, 0, canvas.width, canvas.height);


    // begin looping through each stream
    let current;
    for(let i = 0; i < streams.length; i++){
        current = streams[i];

        // if stream is active(aka, if timer is null)
        if(current.timer === null){
            // draw new position, and iterate the current.current, representing a new char being drawn
            ctx.fillStyle = '#0F0';
	        ctx.font = fontSize + 'px monospace';

            ctx.fillText(current.chars[current.current], current.column*fontSize, (current.height+(current.current*fontSize)));
            current.current++;

            // if current.current has reached the end of the chars string, set stream back to null and give timer a value
            if(current.current === (current.chars.length-1)){
                current.chars = null;
                current.current = null;
                current.column = null;
                current.height = null;
                current.timer = Math.floor(Math.random() * 7);
            }
        }
        if(current.timer != null){
            current.timer--;
            if(current.timer <= 0){
                initializeStream(i);
                current.timer = null;
            }
        }
    }



}


function initializeStream(streamNumber){
    let stream = streams[streamNumber];
    let length = Math.floor((Math.floor(Math.random() * 9)) + 15)
    stream.chars = [];
    let char = '';
    for(let i = 0; i < length; i++){
        char = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        stream.chars.push(char);
    }

    //TODO figure out valid/invalid (x, y) coordinates
    stream.column = Math.floor(Math.random() * columns);
    stream.height = Math.floor(Math.random() * height) - 50;
    stream.current = 0;
    
}

// TODO set an initial setTimeout that calls initializeText() which animates the <info> text on screen, then
// sets the drawStreams interval afterwards

setInterval(drawStreams, 30);

// TODO add flashing white cursor