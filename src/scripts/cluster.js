
const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "123456789";

const alphabet = katakana + letters + numbers;
const fontSize = 14;

export class Cluster{
    streams = [{
        chars : null,
        current : null,
        column : null,
        height : null,
        timer : 10,
        active : false,
    
    },{
        chars : null,
        current : null,
        column : null,
        height : null,
        timer : 15,
        active : false,
    },{
        chars : null,
        current : null,
        column : null,
        height : null,
        timer : 4,
        active : false, 
    },{
        chars : null,
        current : null,
        column : null,
        height : null,
        timer : 1,
        active : false,
    }]
    x;
    y;
    radius = 50;
    fontSize = 14;
    middleLeft;
    middleRight;
    height;
    width;
    ctx;

    constructor(middleLeft, middleRight, height, width, ctx){
        this.middleLeft = middleLeft;
        this.middleRight = middleRight;
        this.height = height;
        this.width = width;
        this.ctx = ctx;

        this.softReset();
    }


    softReset(){
        console.log("resetting...")
        let rangeWidth = this.middleRight - this.middleLeft;
        let maxX = this.width;
        
        if (Math.random() < 0.5) {
            // Random value in the range [0, middleLeft - rangeWidth]
            this.x = Math.random() * (this.middleLeft - rangeWidth);
        } else {
            // Random value in the range [middleRight, width - rangeWidth]
            this.x = this.middleRight + Math.random() * (maxX - this.middleRight);
        }
        // preset height offset is 252px, which will mean that streams only occasionally fall off the page
        this.y = Math.random()*(this.height-252);

        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(this.x, this.y, 20, 20)
        
        this.streams.forEach(stream => {
            stream.active = false;
            stream.current = 0;
            stream.timer = Math.random()*20;
        })
    
        this.streams.forEach(stream => {
            let length = Math.floor((Math.floor(Math.random() * 9)) + 15)
            stream.chars = [];
            let char = '';
            for(let i = 0; i < length; i++){
                char = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
                stream.chars.push(char);
            }
            
            stream.column = this.x-this.radius+(Math.random()*this.radius*2)
            stream.height = this.y-this.radius+(Math.random()*this.radius*3)
            stream.active = true;
        })   
        
    }

    
    
    
    draw(){
        let count = 0;
        this.streams.forEach(stream =>{
            count++
            if(stream.active === true){
        
                if(stream.timer < 0){
                    this.ctx.fillStyle = '#0F0';
                    this.ctx.font = fontSize + 'px monospace';
                    this.ctx.fillText(stream.chars[stream.current], stream.column, (stream.height+(stream.current*fontSize)));
                    stream.current++;
                    if(stream.current >= stream.chars.length){
                        stream.active = false;
                    }
                }else{
                    stream.timer--
                }

            }else{
                if(stream.active === false && stream.timer > 0 && stream.chars.length > 0){
                    stream.active = true;
                }
            }
        // if the timer is greater than 0, wait to start drawing until it's less than 0

            if(this.streams[0].active === false && this.streams[1].active === false && this.streams[2].active === false &&
                this.streams[3].active === false){
                    setTimeout(5000, this.softReset())
                    
                }
        })
        
    }
}