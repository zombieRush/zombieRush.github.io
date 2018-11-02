function fullScreen() {
  // check if user allows full screen of elements. This can be enabled or disabled in browser config. By default its enabled.
  //its also used to check if browser supports full screen api.
  if ("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {


      var element = document.getElementById("canvas");
      //requestFullscreen is used to display an element in full screen mode.
      if ("requestFullscreen" in element) {
        element.requestFullscreen();
      } else if ("webkitRequestFullscreen" in element) {
        element.webkitRequestFullscreen();
      } else if ("mozRequestFullScreen" in element) {
        element.mozRequestFullScreen();
      } else if ("msRequestFullscreen" in element) {
        element.msRequestFullscreen();
      }




    }
  } else {
    alert("Y U NO GET FULLSCREEN!?!?!");
  }
}
try {
  /*
	HOW TO PLAY
	-------------------------------------------------------------------
	---wasd/arrows to move                                          ---
	---jump away from zombies for 15 seconds                        ---
	---don't die                                                    ---
	---freeze power ups stop zombies for rest of round              ---
	---gun power up allows you to shoot with space for rest of round---
	-------------------------------------------------------------------
	*/
  console.clear();
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var zombFreeze = false;
  var zombGun = false;
  var plr = 490;
  var x = 250;
  var v = 0;
  var h = 0;
  var mouseX = 0;
  var mouseY = 0;
  var keys = {
    a: false,
    d: false
  }

  function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  function pwrUp(type) {
    this.type = type;
    this.y = -10;
    
    this.v = 0;
    this.x = Math.floor(Math.random() * 500)
    this.falling = true;
    this.update = function() {
      if (this.type == "speed") {
        ctx.fillStyle = "#cecece";
        ctx.fillRect(this.x, this.y, 10, 10);
        if (!zombGun) {
          ctx.strokeStyle = "#000";
          ctx.beginPath();
          ctx.moveTo(this.x + 3, this.y + 8);
          ctx.lineTo(this.x + 3, this.y + 4);;
          ctx.lineTo(this.x + 8, this.y + 4)
          ctx.stroke();
        } else {
          ctx.strokeStyle = "green";
          ctx.beginPath();
          ctx.moveTo(this.x + 2, this.y + 8);
          ctx.lineTo(this.x + 2, this.y + 2);
          ctx.moveTo(this.x + 5, this.y + 8);
          ctx.lineTo(this.x + 5, this.y + 2)
          ctx.moveTo(this.x + 8, this.y + 8)
          ctx.lineTo(this.x + 8, this.y + 2)
          ctx.stroke();
        }

        if (x < this.x + 10 &&
            x + 10 > this.x &&
            plr < this.y + 10 &&
            plr + 10 > this.y) {
          // collision detected!
          zombGun = true;
          bulletNum += 15;
          pww = null;
        }
      }
      if (this.type == "freeze") {
        ctx.fillStyle = "#3af5ff"
        ctx.fillRect(this.x, this.y, 10, 10)
        ctx.strokeWidth = 1
        ctx.strokeStyle = "#fff"
        ctx.beginPath()
        ctx.moveTo(this.x + 5, this.y + 2)
        ctx.lineTo(this.x + 5, this.y + 8)
        ctx.moveTo(this.x + 2, this.y + 5)
        ctx.lineTo(this.x + 8, this.y + 5)
        ctx.moveTo(this.x + 2, this.y + 2)
        ctx.lineTo(this.x + 8, this.y + 8)
        ctx.moveTo(this.x + 2, this.y + 8)
        ctx.lineTo(this.x + 8, this.y + 2)
        ctx.stroke()

        if (x < this.x + 10 &&
            x + 10 > this.x &&
            plr < this.y + 10 &&
            plr + 10 > this.y) {
          // collision detected!
          zombFreeze = true;

        }
      }
      if (this.falling) {
        ctx.strokeStyle = "#000";
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - 4, this.y - 10)
        ctx.moveTo(this.x + 10, this.y)
        ctx.lineTo(this.x + 14, this.y - 10)
        ctx.stroke();
        ctx.fillStyle = "#753e00"
        ctx.beginPath()
        ctx.arc(this.x + 5, this.y - 10, 9, Math.PI, 2 * Math.PI)
        ctx.fill();
      }
      this.v = 5
      this.y += this.v
      if (this.y > 490) {
        this.y = 490
        this.v = 0
        this.falling = false;
      }
    }
  }

  function zomb() {
    this.y = 490
    this.j = 0
    this.health = 10
    if (Math.random() > 0.5) {
      this.x = 500
    } else {
      this.x = -10
    }



    this.update = function() {
      if (this.health > 0) {
        if (((Math.floor(Math.random() * 500) == Math.floor(Math.random() * 500))) && this.y == 490) {
          this.j = -3
        }
        this.j += 0.3
        this.y += this.j
        if (this.y > 490) {
          this.y = 490
        }

        ctx.fillStyle = "rgb(247, 49, 224)"
        
        ctx.fillRect(this.x + 2, this.y - 2, 6, 2)
        ctx.fillStyle = "green"
        ctx.fillStyle = "#FF7619"
        ctx.fillRect(this.x, this.y, 10, 10)
        
        ctx.fillStyle = "black"

        if (this.x < x) {
          if (!zombFreeze) {
            this.x += 1
          }
          ctx.fillRect(this.x + 5, this.y + 2, 3, 3)
        } else if (this.x > x) {
            if (!zombFreeze) {
              this.x -= 1
            }
          
          ctx.fillStyle = "black"
            ctx.fillRect(this.x + 1, this.y + 2, 3, 3)
            
          } else {
            ctx.fillRect(this.x + 5, this.y + 2, 3, 3);
            ctx.fillRect(this.x + 1, this.y + 2, 3, 3);
          }
      } else {
        this.x = -20;
      }
    }
  }

  var pause = false
  var zombs = [new zomb()]
  var time = 0
  var health = 100
  var dir = "left"
  var lvl = 1
  var sec = 0
  var infinite = !true;


  function bullet(dir) {
    this.dir = "left"
    this.y = plr + 2
    if (dir == "left") {
      this.dir = "left"
      this.x = x - 5
    }
    if (dir == "right") {
      this.dir = "right"
      this.x = x + 10
    }
    this.update = function() {
      ctx.fillStyle = "#000";
      ctx.fillRect(this.x, this.y, 5, 2)
      if (this.dir == "left") {
        this.x -= 9
      }
      if (this.dir == "right") {
        this.x += 9;
      }
    }
  }
  var bulletNum = 0
  var bullets = []
  var menu = true;

  function reset() {
    plr = 490;
    x = 250;
    v = 0;
    h = 0;
    keys = {
      a: false,
      d: false
    }
    zombs = [new zomb()]
    time = 0
    health = 100
    dir = "left"
    sec = 0
  }
  var pww = null;
  ctx.textAlign = "center";
  ctx.font = "40px 'BioRhyme'";
  setInterval(function() {
    
    if (menu) {
      ctx.clearRect(0,0,500,500)
      ctx.fillStyle = "blacK"
      ctx.fillText("Zombie Rush", 250, 40)
      ctx.beginPath()
      ctx.strokeStyle = "black";
      ctx.moveTo(100, 100)
      ctx.lineTo(100, 200)
      ctx.lineTo(400, 200)
      ctx.lineTo(400, 100)
      ctx.lineTo(100, 100)
      ctx.stroke()
      ctx.fillStyle = "gray"
      ctx.fillRect(100, 100, 300, 100)
      ctx.fillStyle = "black"
      ctx.fillText("How To Play", 250, 160)

      ctx.beginPath()
      ctx.strokeStyle = "black";
      ctx.moveTo(100, 250)
      ctx.lineTo(100, 350)
      ctx.lineTo(400, 350)
      ctx.lineTo(400, 250)
      ctx.lineTo(100, 250)
      ctx.stroke()
      ctx.fillStyle = "gray"
      ctx.fillRect(100, 250, 300, 100)
      ctx.fillStyle = "black"
      ctx.fillText("Level Based", 250, 310)

      ctx.beginPath()
      ctx.strokeStyle = "black";
      ctx.moveTo(100, 400)
      ctx.lineTo(100, 500)
      ctx.lineTo(400, 500)
      ctx.lineTo(400, 400)
      ctx.lineTo(100, 400)
      ctx.stroke()
      ctx.fillStyle = "gray"
      ctx.fillRect(100, 400, 300, 100)
      ctx.fillStyle = "black"
      ctx.fillText("Endless", 250, 460)
      
      
    } else {
      if (!pause) {
        time++;

        ctx.clearRect(0, 0, 500, 500);
        //Somethi
        if (Math.floor(Math.random() * (100 * Math.sqrt(2))) == Math.floor(Math.random() * (100 * Math.sqrt(2))) && pww == null) {
          if (Math.random() > 0.9) {
            pww = new pwrUp("freeze")
          } else {
            pww = new pwrUp("speed")
          }
        }
        if (pww != null) {
          pww.update()
        }
        ctx.fillStyle = "black"

        ctx.textAlign = "center"
        ctx.fillText(15 - sec, 250, 60)
        ctx.fillRect(x, plr, 10, 10);
        ctx.textAlign = "left"
        ctx.fillText("Lvl " + lvl, 0, 40)
        ctx.textAlign = "right"
        ctx.fillText("Bullets " + bulletNum, 500, 40)

        ctx.fillStyle = "white"
        if (dir == "left") {
          ctx.fillRect(x + 1, plr + 2, 3, 3)
          if (zombGun) {
            ctx.fillStyle = "#333"
            ctx.fillRect(x - 5, plr + 4, 5, 2)
            ctx.fillRect(x - 2, plr + 4, 2, 4);
          }
        } else {
          ctx.fillRect(x + 5, plr + 2, 3, 3)
          if (zombGun) {
            ctx.fillStyle = "#333"
            ctx.fillRect(x + 10, plr + 4, 5, 2)
            ctx.fillRect(x + 10, plr + 4, 2, 4)
          }
        }
        ctx.fillStyle = "rgb(" + (256 - ((health / 2) * (256 / 50))) + "," + ((health / 2 * (256 / 50))) + ",0)"
        ctx.fillRect(x + (100 - health) / 4 - 20, plr - 20, health / 2, 10)
        v += 0.3
        plr += v
        h *= 0.9
        x += h
        if (plr > 490) {
          plr = 490
        }
        if (keys.a) {
          h += -1
        }
        if (keys.d) {
          h += 1
        }
        for (var i = 0; i < zombs.length; i++) {
          zombs[i].update()
          for (var ii = 0; ii < bullets.length; ii++) {

            if (bullets[ii].x < zombs[i].x + 10 &&
                bullets[ii].x + 5 > zombs[i].x &&
                bullets[ii].y < zombs[i].y + 10 &&
                bullets[ii].y + 2 > zombs[i].y) {
              // collision detected!;;
              zombs[i].health -= 5;
              bullets[ii].y = -20;

            }

          }
          if (x < zombs[i].x + 10 &&
              x + 10 > zombs[i].x &&
              plr < zombs[i].y + 10 &&
              plr + 10 > zombs[i].y) {
            // collision detected!
            health--
            if (health == 0) {
              reset();
            }
          }
        }
        if(lvl<50){
        if (time % (map(lvl, 1, 2, 90, 88)+1) == 0) {

          zombs[zombs.length] = new zomb()
        }
        }else{
          
          for(var i = 0; i<map(lvl,50,53,1,3);i++){
            zombs[zombs.length] = new zomb();
          }
          
        }
        if (time % 60 == 0) {
          sec++
          if (sec == 15) {
            lvl++
            sec = 0
            zombFreeze = false;
            pww = null;
            if(!infinite){
            reset()
            zombFreeze = false
            zombGun = false
            pww = null
            bullets = [];
            bulletNum = 0;
            }
          }
        }
        if (x < 0) {
          x = 0
        }
        if (x > 490) {
          x = 490
        }
        if (zombFreeze) {
          pww = null
        }
        for (var i = 0; i < bullets.length; i++) {
          if (bullets[i] != null) {
            bullets[i].update();
          }
        }
      }
    }
  }, 1000 / 60);



  document.onkeydown = function(e) {
    let res = String.fromCharCode(e.keyCode);
    if (((res == "W") || (res == "&")) && plr == 490) {
      v = -7;
    }
    if (res == "A" || res == "%") {
      keys.a = true
      dir = "left";
    }
    if (res == "D" || res == "'") {
      keys.d = true
      dir = "right"
    }
    if (res == "F") {
      fullScreen()
    }
    if (res == "P") {
      pause = !pause
    }
    if (res == " ") {
      if (zombGun) {
        bullets[bullets.length] = new bullet(dir)
        bulletNum--;
        if (bulletNum == 0) {
          zombGun = false;
        }
      }
    }
  }

  document.onkeyup = function(e) {
    let res = String.fromCharCode(e.keyCode)

    if (res == "A" || res == "%") {
      keys.a = false
    }
    if (res == "D" || res == "'") {
      keys.d = false;
    }
  }
  document.onmousedown = function() {
    if (menu) {
      console.log("menu")
      if(mouseX>100 && 400>mouseX){
        //console.log("?")
        if(mouseY>100 && 200>mouseY){
          //console.log("??");
          alert("WASD/arrows to move\nPress P to pause the game\nPress space/click to shoot gun (Only applicable when you have bullets)\nThere are two powers ups that drop from the sky:\nFreeze (Freezes all zombies and prevents them from spawning)\nGun (Allows you to shoot zombies, two shots kill a zombie)");
        }
      }
      
      if(mouseX>100 && 400>mouseX){
        //console.log("?")
        if(mouseY>250 && 350>mouseY){
          //console.log("??");
          menu = false;
          infinite = false;
        }
      }

      if(mouseX>100 && 400>mouseX){
        //console.log("?")
        if(mouseY>400 && 500>mouseY){
          //console.log("??");
          menu = false;
          infinite = true;
        }
      }
    } else {
      if (zombGun) {
        bullets[bullets.length] = new bullet(dir)
        bulletNum--
        if (bulletNum == 0) {
          zombGun = false;
        }
      }
    }
  }
  window.onerror = function(e) {

  }
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    // Use event.pageX / event.pageY here
    mouseX = event.pageX-((window.innerWidth-500)/2)
    mouseY = event.pageY-((window.innerHeight-500)/2)
    //console.log(mouseX,mouseY)
  }
} catch (e) {
  document.write(e);
}
//HAHAH EASTER EGG
//alert(console)
