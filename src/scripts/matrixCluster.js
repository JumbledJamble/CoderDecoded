import { Cluster } from './cluster.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "123456789";

const alphabet = katakana + letters + numbers;
const fontSize = 14;

const height = canvas.height;
const width = canvas.width;
let middleAreaLeft = width*3/7;
let middleAreaRight = width*4/7;



let cluster1 = new Cluster(middleAreaLeft, middleAreaRight, height, width, ctx);
let cluster2 = new Cluster(middleAreaLeft, middleAreaRight, height, width, ctx);
//let cluster3 = new Cluster(middleAreaLeft, middleAreaRight, height, width, ctx);

function drawClusters(){
    // draw clear opaque black rect to give the illusion of a fading depth
	ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

    cluster1.draw()
    cluster2.draw()
    //cluster3.draw()
}

setInterval(drawClusters, 50)