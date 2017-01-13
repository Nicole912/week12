/**
 * Created by airing on 15/10/19.
 */
var documentWidth = window.screen.availWidth >500? 500: window.screen.availWidth;
var margin = 0.04 * documentWidth;
var game_width = 0.92 * documentWidth;
var box_width = 0.18 * documentWidth;
var numSize = 0.10 * documentWidth;

var margin_top = 0;
var margin_left = 0;

var color_bg = "#01B468";
var color_0 = "#FFE6D9";
var color_2 = "#FFDAC8";
var color_4 = "#FFCBB3";
var color_8 = "#FFBD9D";
var color_16 = "#FFAD86";
var color_32 = "##FF9D6F";
var color_64 = "#FF8F59";
var color_128 ="#FF8040";
var color_256 = "#FF5809";
var color_512 = "#F75000";
var color_1024 = "#D94600";
var color_2048 = "#BB3D00";
var color_4096 = "#A23400";
var color_8192 = "#842B00";
var color_text1 = "#336666";
var color_text2 = "#B9B973";
var score = 0;
var nums = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function init(cxt) {
    //游戏背景
    drawRoundRect(cxt, margin_left, margin_top, game_width, game_width, 5);
    cxt.fillStyle = color_bg;
    cxt.fill();

    //初始化二维数组
    for(var i = 0; i < 4; i++){
        nums[i] = new Array();//定义二维数组
        for(var j = 0; j < 4; j++){
            nums[i][j] = 0;
        }
    }

    //初始化16个小格子
    updateBoardView(cxt)
}

function drawRoundRect(cxt, x, y, w, h, r) {
    cxt.beginPath();
    cxt.arc(r + x, r + y, r, 1.0 * Math.PI, 1.5 * Math.PI, false);
    cxt.lineTo(w - r + x, y);
    cxt.arc(w - r + x, r + y, r, 1.5 * Math.PI, 2.0 * Math.PI, false);
    cxt.lineTo(w + x, h - r + y);
    cxt.arc(w - r + x, h - r + y, r, 0.0 * Math.PI, 0.5 * Math.PI, false);
    cxt.lineTo(r + x, h + y);
    cxt.arc(r + x, h - r + y, r, 0.5 * Math.PI, 1.0 * Math.PI, false);
    cxt.closePath();
}

function drawBox(cxt, i, j, nums){

    var x = (i+1)* margin + margin_left +i * box_width;
    var y = (j+1)* margin + margin_top +j * box_width;

    drawRoundRect(cxt , x, y, box_width, box_width, 5);

    cxt.font = numSize + "px Arial";  // 60px Arial
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";

    switch (nums) {
        case 0:
            cxt.fillStyle=color_0;
            break;
        case 2:
            cxt.fillStyle=color_2;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText("炼气", x + box_width / 2, y + box_width / 2);
            break;
        case 4:
            cxt.fillStyle = color_4;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText("筑基", x + box_width / 2, y + box_width / 2);
            break;
        case 8:
            cxt.fillStyle = color_8;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText("开光", x + box_width / 2, y + box_width / 2);
            break;
        case 16:
            cxt.fillStyle = color_16;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText("胎息", x + box_width / 2, y + box_width / 2);
            break;
        case 32:
            cxt.fillStyle = color_32;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText("辟谷", x + box_width / 2, y + box_width / 2);
            break;
        case 64:
            cxt.fillStyle = color_64;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText("金丹", x + box_width / 2, y + box_width / 2);
            break;
        case 128:
            cxt.fillStyle = color_128;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("元婴", x + box_width / 2, y + box_width / 2);
            break;
        case 256:
            cxt.fillStyle = color_256;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("出窍", x + box_width / 2, y + box_width / 2);
            break;
        case 512:
            cxt.fillStyle = color_512;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("分神", x + box_width / 2, y + box_width / 2);
            break;
        case 1024:
            cxt.fillStyle = color_1024;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("合体", x + box_width / 2, y + box_width / 2);
            break;
        case 2048:
            cxt.fillStyle = color_2048;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("大乘", x + box_width / 2, y + box_width / 2);
            break;
        case 4096:
            cxt.fillStyle = color_4096;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText("渡劫", x + box_width / 2, y + box_width / 2);
            break;

            break;
        default :
            break;
    }

    cxt.fill();
}

//刷新View
function updateBoardView(cxt) {
    for(var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawBox(cxt, i, j, nums[i][j]);
        }
    }
}

