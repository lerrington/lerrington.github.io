var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game #660033
            var backgroundFill = draw.rect(canvasWidth,groundY,'#660033'); // FIXME: use canvasHeight/canvasWidth properties!
            background.addChild(backgroundFill);
            
            
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i=0;i<50;i++) {
                circle = draw.circle(10,'#ffff99','orange',2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 50;
            moon.y = 10;
            moon.scaleX = .25;
            moon.scaleY = .25;
            background.addChild(moon);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var buildingHeights = [200, 250, 225, 300, 150];
            var building;
            
            for(var b = 0; b < 5; b++) {
                building = draw.rect(75, buildingHeights[b], '#802b00', '#4d1a00', 1);
                building.x = 385*b;
                building.y = groundY-buildingHeights[b];
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/spookytree.png');
            tree.x = 500;
            tree.y =250;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            tree.x = tree.x - 7;
            if(tree.x < -200){
                tree.x = canvasWidth;
            }         
            // TODO 5: Part 2 - Parallax
            for(var s = 0; s < buildings.length; s++){
                var movement = buildings[s];
                movement.x = movement.x - 10;
                if(movement.x < 0) {
                    movement.x = canvasWidth;
                }
            }    
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
