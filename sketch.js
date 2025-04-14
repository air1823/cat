let circles = []; // 儲存圓形的陣列
let stars = []; // 儲存星星的陣列
let hearts = []; // 儲存愛心的陣列
let showMenu = false; // 控制選單顯示的布林值
let showSubMenu = false; // 控制子選單顯示的布林值
let iframe; // 用於顯示內容的 iframe
let lockSubMenu = false; // 鎖定子選單的顯示狀態
let colors = ["#dec9e9", "#dac3e8", "#d2b7e5", "#c19ee0", "#b185db", "#a06cd5", "#9163cb", "#815ac0", "#7251b5", "#6247aa"];
let tailwindColors = ["#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4"];
let showCat = false; // 控制是否顯示紫色貓咪

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(); // 移除圓形邊框

  // 初始化圓形
  for (let i = 0; i < 20; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(20, 50),
      color: color(random(colors)), // 隨機分配顏色
      speedX: random(-1, 1), // 慢速 X 移動
      speedY: random(-1, 1)  // 慢速 Y 移動
    });
  }

  // 初始化星星
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      color: color(random(tailwindColors)) // 隨機分配 Tailwind 顏色
    });
  }

  // 初始化愛心
  for (let i = 0; i < 30; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 20),
      color: color(random(tailwindColors)) // 隨機分配 Tailwind 顏色
    });
  }

  // 初始化 iframe
  iframe = createElement('iframe');
  iframe.position(50, height / 3); // 將 iframe 放置在畫布下方，距離邊框至少 50
  iframe.size(width - 100, height * 2 / 3 - 50); // 縮小 iframe，距離邊框至少 50
  iframe.style('z-index', '1'); // 確保 iframe 在背景之上但按鍵之下
  iframe.style('position', 'absolute'); // 確保 iframe 不受畫布影響
  iframe.hide(); // 預設隱藏 iframe
}

function draw() {
  // 1. 繪製背景（最底層）
  background("#dec9e9"); // 柔和背景色

  // 2. 繪製星星、愛心和圓形（中間層）
  for (let star of stars) {
    fill(star.color);
    noStroke();
    ellipse(star.x, star.y, star.size); // 繪製星星
  }

  for (let heart of hearts) {
    fill(heart.color);
    noStroke();
    drawHeart(heart.x, heart.y, heart.size); // 繪製愛心
  }

  for (let circle of circles) {
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    if (circle.x < 0 || circle.x > width) circle.speedX *= -1;
    if (circle.y < 0 || circle.y > height) circle.speedY *= -1;

    circle.size = map(mouseX, 0, width, 10, 100);

    fill(circle.color); // 設定顏色
    ellipse(circle.x, circle.y, circle.size); // 繪製圓形
  }

  // 顯示紫色貓咪
  if (showCat) {
    drawCat(width / 2, height / 2); // 在畫面中間繪製貓咪
  }

  // 3. 檢查滑鼠是否在畫面上半部的三分之一處
  if (mouseY < height / 3) {
    showMenu = true;
  } else if (!lockSubMenu) {
    showMenu = false;
    showSubMenu = false; // 當主選單隱藏時，隱藏子選單
  }

  // 4. 繪製選單和子選單（最上層）
  if (showMenu) {
    drawMenu();
  }
}

function drawMenu() {
  // 選單樣式
  let menuItems = ["首頁", "自我介紹", "作品", "測驗卷", "教學影片"];
  let menuX = 20; // 選單起始位置
  let menuY = 20;
  let itemWidth = 120; // 縮小選項寬度
  let itemHeight = 40; // 縮小選項高度

  for (let i = 0; i < menuItems.length; i++) {
    let itemX = menuX + i * (itemWidth + 10); // 橫向排列
    let itemY = menuY;

    // 檢查滑鼠是否在選單項目上
    let isHovered = mouseX > itemX && mouseX < itemX + itemWidth && mouseY > itemY && mouseY < itemY + itemHeight;

    // 設定選單樣式
    fill(isHovered ? color("#b185db") : color("#dac3e8")); // 背景顏色
    stroke(isHovered ? color("#b185db") : color("#6247aa")); // 邊框顏色
    strokeWeight(2);
    rect(itemX, itemY, itemWidth, itemHeight, 10); // 圓角矩形

    // 設定文字樣式
    fill("#6247aa");
    noStroke();
    textSize(20); // 縮小文字大小
    textAlign(CENTER, CENTER);
    text(menuItems[i], itemX + itemWidth / 2, itemY + itemHeight / 2); // 文字置中

    if (isHovered && mouseIsPressed) {
      if (menuItems[i] === "首頁") {
        iframe.hide(); // 隱藏 iframe
        lockSubMenu = false; // 解鎖子選單
        showCat = true; // 顯示紫色貓咪
      } else if (menuItems[i] === "測驗卷") {
        iframe.attribute('src', 'https://air1823.github.io/math/');
        iframe.show();
        lockSubMenu = false; // 解鎖子選單
        showCat = false; // 隱藏紫色貓咪
      } else if (menuItems[i] === "作品") {
        showSubMenu = true;
        lockSubMenu = true; // 鎖定子選單
        showCat = false; // 隱藏紫色貓咪
      } else if (menuItems[i] === "自我介紹") {
        iframe.attribute('src', 'https://air1823.github.io/-/');
        iframe.show();
        lockSubMenu = false; // 解鎖子選單
        showCat = false; // 隱藏紫色貓咪
      }
    }
  }

  // 顯示子選單
  if (showSubMenu) {
    drawSubMenu(menuX + 2 * (itemWidth + 10), menuY + itemHeight + 20); // 子選單位置
  }
}

function drawSubMenu(x, y) {
  // 子選單樣式
  let subMenuItems = ["第一周作業", "第二周作業", "第三周作業", "第四周作業"];
  let itemWidth = 120; // 縮小選項寬度
  let itemHeight = 40; // 縮小選項高度

  for (let i = 0; i < subMenuItems.length; i++) {
    let itemX = x;
    let itemY = y + i * (itemHeight + 10); // 垂直排列

    // 檢查滑鼠是否在子選單項目上
    let isHovered = mouseX > itemX && mouseX < itemX + itemWidth && mouseY > itemY && mouseY < itemY + itemHeight;

    // 設定子選單樣式
    fill(isHovered ? color("#a06cd5") : color("#d2b7e5")); // 背景顏色
    stroke(isHovered ? color("#a06cd5") : color("#6247aa")); // 邊框顏色
    strokeWeight(2);
    rect(itemX, itemY, itemWidth, itemHeight, 10); // 圓角矩形

    // 設定文字樣式
    fill("#6247aa");
    noStroke();
    textSize(20); // 縮小文字大小
    textAlign(CENTER, CENTER);
    text(subMenuItems[i], itemX + itemWidth / 2, itemY + itemHeight / 2); // 文字置中

    if (isHovered && mouseIsPressed) {
      if (subMenuItems[i] === "第一周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250303/');
        iframe.show();
      } else if (subMenuItems[i] === "第二周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250314/');
        iframe.show();
      } else if (subMenuItems[i] === "第三周作業") {
        iframe.attribute('src', 'https50317/');
        iframe.show();
      } else if (subMenuItems[i] === "第四周作業") {
        iframe.attribute('src', 'https://air1823.github.io/20250324/');
        iframe.show();
      }
    }
  }
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function drawCat(x, y) {
  fill("#815ac0"); // 紫色
  
  // 尾巴（翹起，晃動幅度向上移動）
  let tailAngle = sin(frameCount * 0.05) * 30 +80; // 尾巴晃動角度，基礎角度向上翹
  push();
  translate(x + 15, y + 95); // 尾巴基點（向上移動）
  rotate(radians(tailAngle)); // 尾巴旋轉
  noStroke();
  fill("#815ac0");
  ellipse(0, -50, 15, 100); // 翹起的尾巴
  pop();

  noStroke();

  // 身體（更圓）
  ellipse(x, y + 60, 90, 110);

  // 頭
  ellipse(x, y, 70, 70);

  // 耳朵（連接到頭部，位置稍微往下）
  push();
  translate(x - 15, y - 15); // 左耳位置
  rotate(radians(-45)); // 左耳旋轉 -30 度
  triangle(-15, -10, 0, -30, 15, -10);
  pop();

  push();
  translate(x + 15, y - 15); // 右耳位置
  rotate(radians(45)); // 右耳旋轉 30 度
  triangle(-15, -10, 0, -30, 15, -10);
  pop();

  // 眼睛
  fill("#ffffff");
  ellipse(x - 15, y, 12, 12);
  ellipse(x + 15, y, 12, 12);

  fill("#000000");
  ellipse(x - 15, y, 6, 6);
  ellipse(x + 15, y, 6, 6);

  // 鼻子（移到眼睛平行的位置）
  fill("#ff99ac");
  triangle(x - 5, y + 5, x + 5, y + 5, x, y + 10);

  // 嘴巴（連接在鼻子下面）
  noFill();
  stroke("#000000");
  strokeWeight(2);
  arc(x - 5, y + 12, 10, 10, 0, PI);
  arc(x + 5, y + 12, 10, 10, 0, PI);
}
  