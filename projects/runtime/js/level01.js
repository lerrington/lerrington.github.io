var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        function createSpoopyPumpkin(x, y) {
            
         var mySpoopyPumpkin = game.createObstacle(25, 25);
            mySpoopyPumpkin.x = x;
            mySpoopyPumpkin.y = y;
            game.addGameItem(mySpoopyPumpkin);  
            
            var spoopyImage = draw.bitmap('img/pumpkin.png');
            spoopyImage.x = -25;
            spoopyImage.y = -25; 
            mySpoopyPumpkin.addChild(spoopyImage)
        }
        createSpoopyPumpkin(1500, groundY - 50);
        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,              
            gameItems: [
                {type: 'sawblade',x:400,y:groundY-130},
                {type: 'sawblade',x:900,y:groundY-5},
                {type: 'sawblade',x:1400,y:groundY-130},
                {type: 'sawblade',x:1800,y:groundY-5}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        
        function createSawBlade(x,y) {
            
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            game.addGameItem(myObstacle);  
            myObstacle.x = x;
            myObstacle.y = y;
        
            var obstacleImage = draw.bitmap('img/mrghost.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25; 
    
        }
        
        
        
        for(var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            createSawBlade(gameItem.x, gameItem.y);
            
        }
       
        
        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25); 
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 0;
            enemy.onPlayerCollision = function() {
                console.log("the enemy has hit Halle.");
                game.changeIntegrity(-10);
        };
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.fadeOut();
        };
        }
        
        createEnemy(100, groundY);
        createEnemy(200, groundY);
        createEnemy(300, groundY);
        
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.bitmap('img/catcat.png');
        redSquare.x = -25;
        redSquare.y = -50;
        enemy.velocityX = -5;

        enemy.addChild(redSquare);
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.fadeOut();
        };
        
        enemy.onPlayerCollision = function() {
                console.log("the enemy has hit Halle.");
                game.changeIntegrity(-10);
        };
        enemy.x= 1500;
        enemy.y = groundY-40;
        
        game.addGameItem(enemy); 
        
        function createReward(x, y) {
            var myReward = game.createGameItem('reward', 25);
            myReward.y = y;
            myReward.x = x;
            myReward.velocityX = -5;
            game.addGameItem(myReward);
           
            var rewardImage = draw.bitmap('img/bettercandy.png');
            rewardImage.x = -50;
            rewardImage.y = -50;
            myReward.addChild(rewardImage);
            myReward.onPlayerCollision = function() {
                game.changeIntegrity(50);
                game.increaseScore(1000);
                myReward.fadeOut();
                console.log("hit");
            };
            
        }
            
           createReward(1200, 450);
            
        
    };
    
    
};

    



// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

