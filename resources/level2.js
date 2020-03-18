    var config = {
        type: Phaser.AUTO,
        width: 2000,
        height: 800,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1800 },
                debug: false
            }},

        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var platforms;
    var player;
    var cursors;
    var smplatw;
    var smplat;
    var score=0;
    var scoreText;
    var food;
    var pass;
    var buttons;
    var buttons2;
    var doorsc2;
    var doorso2;
    var playerpx2;

    var gameOver=false;

    window.onload = function() {
    resize();
    // resize();
    // resize();
    // resize();
    // resize();
    // resize();
    // resize();
    window.addEventListener("resize", resize, false);
    }

    function preload ()
    {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(860, 370, 320, 50);
            
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
        var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            
            
        this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(870, 380, 300 * value, 30);
            });
            
            

        this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                
            });     



        this.load.image('back', 'panda/level2/back2.jpeg');
        this.load.image('watwave2', 'panda/level2/watwave.png');
        this.load.image('cloud', 'panda/level2/cloud2.png');
        this.load.image('platform', 'panda/level2/ground2.png');
        this.load.image('platformsm', 'panda/level2/groundsm2.png');
        //this.load.image('water', 'panda/level2/water2.png');
        this.load.image('win2', 'panda/level2/win2.png');
        this.load.image('apple', 'panda/level2/apple2.png');
        this.load.image('pass2', 'panda/level2/key2.png');
        this.load.image('button2', 'panda/level2/button2.png');
        this.load.image('doorc2', 'panda/level2/doorc2.png');
        this.load.image('dooro2', 'panda/level2/dooro2.png');
        this.load.image('rain2', 'panda/level2/rain2.png');
        this.load.image('gameover2', 'panda/level2/gameover2.png');
        this.load.spritesheet('pandapx2', 'panda/level2/pandapx2.png', {frameWidth: 70, frameHeight: 100 });
        this.load.spritesheet('startBtn', 'panda/level2/startBtn.png', {frameWidth: 60, frameHeight: 60 });
        this.load.audio('jump', 'panda/level2/jump4.mp3');
        this.load.audio('rainsn2', 'panda/level2/rainsn2.mp3');
        this.load.audio('collect', 'panda/level2/collect.mp3');
        this.load.audio('gameov', 'panda/level2/gameov.mp3');
        this.load.audio('buttsound', 'panda/level2/buttsound.mp3');
        this.load.audio('gateop', 'panda/level2/gateop.mp3');
        
    }

    function create ()
    {
        this.add.image(1000, 400, 'back');
        
        

        this.add.image(100, 460, 'rain2');
        this.add.image(800, 480, 'rain2');        
        this.add.image(1540, 480, 'rain2');
        this.add.image(2000, 450, 'rain2');
        

        this.add.image(50, 80, 'cloud');
        this.add.image(350, 60, 'cloud');
        this.add.image(800, 70, 'cloud');
        this.add.image(700, 100, 'cloud');
        this.add.image(1400, 90, 'cloud');
        this.add.image(1140, 70, 'cloud');
        this.add.image(1740, 30, 'cloud');
        this.add.image(1900, 60, 'cloud');

       
        // this.startBtn = this.add.sprite(500, 400, 'startBtn').setInteractive();

        
        // this.startBtn.on('pointerdown', startGame); // Start game on click.

        platforms = this.physics.add.staticGroup();
        platforms.create(800, 760, 'platform');
        platforms.create(2400, 760, 'platform');

          
        smplat = this.physics.add.staticGroup();
        smplat.create(350, 580, 'platformsm').setScale(0.3).refreshBody();

        food = this.physics.add.staticGroup();
        food.create(680, 480, 'apple');
        food.create(1280, 580, 'apple');
        food.create(1250, 70, 'apple');

        pass = this.physics.add.staticGroup();
        buttons = this.physics.add.staticGroup();

        smplatw = this.physics.add.staticGroup();
        smplatw.create(680, 430, 'platformsm').setScale(0.3).refreshBody();

        playerpx2 = this.physics.add.sprite(50, 640, 'pandapx2');
        playerpx2.setBounce(0.2);
        playerpx2.setCollideWorldBounds(true);

        doorsc2 = this.physics.add.staticGroup();
        doorso2 = this.physics.add.staticGroup();
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pandapx2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'pandapx2', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pandapx2', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        cursors = this.input.keyboard.createCursorKeys();
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '36px', fill: '#fff' });

        this.physics.add.collider(platforms, playerpx2);
        //this.physics.add.collider(waters, player, drown, null, this);
        this.physics.add.collider(smplatw, playerpx2, death, null, this).name = 'platf';
        this.physics.add.collider(smplat, playerpx2);
        this.physics.add.collider(playerpx2, doorsc2).name = 'doorcr';
        this.physics.add.collider(playerpx2, buttons, showall, null, this).name = 'butt';
        this.physics.add.overlap(playerpx2, food, collecta, null, this);
        this.physics.add.overlap(playerpx2, pass, last, null, this);
        this.physics.add.collider(playerpx2, doorso2, win, null, this);
        


         
    }
    

    function update ()
    {
        if (gameOver)
        {
            return;
        }
        if (cursors.left.isDown)
        {
            playerpx2.setVelocityX(-300);

            playerpx2.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            playerpx2.setVelocityX(300);

            playerpx2.anims.play('right', true);
        }
        else
        {
            playerpx2.setVelocityX(0);

            playerpx2.anims.play('turn');
        }

        if (cursors.up.isDown && playerpx2.body.touching.down)
        {
            this.sound.play('jump');  
            playerpx2.setVelocityY(-750);
        }
    }

    function collecta(playerpx2, food)
    {
        food.disableBody(true, true)
        score=score+10;
        scoreText.setText('score: ' + score);
        this.sound.play('collect');

        

    }

    function last(playerpx2, pass)
    {
        pass.disableBody(true, true)

        score = score+20;
        scoreText.setText('score:' + score);

        if(score==50)
        {
            doorso2.create(1920, 130, 'dooro2').setScale(1.5).refreshBody();
            this.sound.play('gateop');

            smplat.create(1660, 380, 'platformsm').setScale(0.3).refreshBody();

            this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
                    return i.name == 'doorcr'
                    }));

            this.sound.play('collect');
        }
        else
        {
            this.physics.pause();
            playerpx2.setTint(0xff0000);
            playerpx2.anims.play('turn', false);   
            gameOver = true;
            this.sound.play('gameov');
            this.add.image(940, 350, 'gameover2');
            var msgText = this.add.text(700, 450, 'Collect all apples first', { fontSize: '36px', fill: '#fff' });

            this.startBtn = this.add.sprite(940, 550, 'startBtn').setInteractive();

            this.startBtn.on('pointerdown', startGame); // Start game on click.
        }

    }

    function death()
    {   
        
        var watwave2 = this.physics.add.staticGroup();
        watwave2.create(400, 745, 'watwave2').setScale(1.2).refreshBody();
        watwave2.create(1200, 745, 'watwave2').setScale(1.2).refreshBody();
        watwave2.create(2000, 745, 'watwave2').setScale(1.2).refreshBody();
        this.physics.add.collider(watwave2, playerpx2, drown, null, this);
        this.physics.add.collider(platforms, watwave2, delpl, null, this);

        smplat.create(80, 250, 'platformsm').setScale(0.3).refreshBody();
        smplat.create(480, 150, 'platformsm').setScale(0.3).refreshBody();
        smplat.create(920, 290, 'platformsm').setScale(0.3).refreshBody();

        pass.create(1600, 480, 'pass2');
        buttons.create(60, 235, 'button2');

        

        smplat.create(680, 430, 'platformsm').setScale(0.3).refreshBody();
        this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
                    return i.name == 'platf'
                    }));
        
        
        
    }

    function drown()
    {
        this.physics.pause();
        playerpx2.setTint(0xff0000);
        playerpx2.anims.play('turn', false);   
        gameOver = true;
        this.sound.play('gameov');
        this.add.image(940, 350, 'gameover2');

        this.startBtn = this.add.sprite(940, 500, 'startBtn').setInteractive();

        
        this.startBtn.on('pointerdown', startGame); // Start game on click.
    }

    function showall()
    {   
        this.sound.play('buttsound');
        smplat.create(1600, 670, 'platformsm').setScale(0.3).refreshBody();
        smplat.create(1800, 670, 'platformsm').setScale(0.3).refreshBody();
        smplat.create(2000, 670, 'platformsm').setScale(0.3).refreshBody();

        smplat.create(1900, 250, 'platformsm').setScale(0.3).refreshBody();

        smplat.create(1280, 530, 'platformsm').setScale(0.3).refreshBody();

        doorsc2.create(1920, 130, 'doorc2').setScale(1.5).refreshBody();

        buttons2 = this.physics.add.staticGroup();
        buttons2.create(60, 235, 'button2');
        this.physics.add.collider(playerpx2, buttons2);

        this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
                    return i.name == 'butt'
                    }));
    }

    function startGame()
    {
        window.location.replace("level2.html");
    }


    function win()
    {
            this.physics.pause();
            playerpx2.setTint(0x008000);
            playerpx2.anims.play('turn');
            gameOver = true;            
            //window.location.replace("level1.html");
            this.add.image(940, 350, 'win2');
    }

    function delpl(platform, watwave)
    {
        platform.disableBody(true, true);
    }

    function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
    }