var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');

var birding = new Image();
var hinhnenchinh = new Image();
var ongtren = new Image();
var ongduoi = new Image();
birding.src = "image/bird.png";
ongtren.src = "image/ongtren.png";
ongduoi.src = "image/ongduoi.png";
hinhnenchinh.src = "image/nenchinh.png";

var score = 0; // diem
var space = 140; // khoang cach hai ong
var space_bottom; // khoang cach ong duoi toi ong tren

// tao 1 object chia x y la ca nua canvas
var bird = {
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong = []; // tao ra cac mang ong di chuyen

    ong[0] = {
        x: canvas.width,
        y: 0 // khoi tao ong dau tien ben ngoai cung va y = 0
    }

// funcion de chay
function run(){
    context.drawImage(hinhnenchinh, 0, 0);
    context.drawImage(birding, bird.x, bird.y);

    for(var i = 0; i < ong.length; i++){
        space_bottom = ongtren.height + space;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        // ve ong tren theo toa do cua ong do, ong duoi phu thuoc ong tren
        context.drawImage(ongduoi, ong[i].x, ong[i].y + space_bottom);

        ong[i].x -= 5; // lam ong di chuyen

        if(ong[i].x == canvas.width/2){
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random()*ongtren.height) - ongduoi.height
            })
        }
        // neu ong cham le trai thi xoa no di de tranh mang bi day lam cham
        if(ong[i].x == 0) ong.splice(0,1);

        if(ong[i].x == bird.x) score++;

        if(bird.y + birding.height == canvas.height || bird.x + birding.width >= ong[i].x && bird.x <= ong[i].x
             + ongtren.width && (bird.y <= ong[i].y + ongtren.height || bird.y + birding.height >= ong[i].y + space_bottom)){
            return;
        }
    }
    scoreshow.innerHTML = "score: " + score;
    bird.y += 3; // cho brid bay xuong
    requestAnimationFrame(run);
}
// funcion bay len khi nhan phim space
    document.addEventListener("keydown", function(){
        bird.y -= 60;
    })
    run();