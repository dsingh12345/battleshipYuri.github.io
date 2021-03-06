
    var sketchProc = function(processingInstance) {
     with (processingInstance) {

    size(1300,550); 
    frameRate(30);    
    var menu = true;
    var credits = false;
    var testing = 0;
    var instructions = false;
    var play = false;
    var multiplayerOnline = false;
    var statistics = false;
    var winState = false    ;
    var playerOneTurn = true;


    var mouseIsPressed = false;
    var mousePressed = function(){
        mouseIsPressed=true;
    };
    var mouseReleased = function(){
        mouseIsPressed = false;
    };

    var networkClass = function(){

        this.sendHtppRequest = true;
        this.startOnlineGame = false;
        
    };

    var shipClass = function(){


        this.numberOfShips = 5;

        this.win = false;

        // the begin and end coordinate in below array is for sending backend the coordinates of the ship
        this.shipName = [

        //patrolBoat : 
        { color : { r: 0, g: 240 , b: 0 } , size: 2  } ,
        //submarine  : 
        { color : { r: 153 , g: 0 , b: 204 } , size : 3 } ,
        //destroyer  : 
        { color : { r: 255 , g: 0 , b: 37 } , size : 3 } ,
        //battleship : 
        { color : { r: 235 , g: 104 , b: 65 }  , size : 4   } ,
        //aircraftCarrier : 
        {color : { r: 255 , g: 255 , b: 0 } , size: 5 } ,

        ];
        
    };  

    /*
    var playClass = function(){

    // inherit attributes ffrom ship class
    shipClass.call( this );



    };

    /*
    playClass.prototype.play = function(playerIs){

    var indent =0 , i=1 , j=1 ;

    if( ( this.shipName[0].currLife + this.shipName[1].currLife + this.shipName[2].currLife + this.shipName[3].currLife + this.shipName[4].currLife ) === 0){
        this.win = true;
        return 1;
    }

    if(this.turn < 100){
        // check for win condition in each turn

        if(playerIs === 2){
            indent = 500;
        } 
        
        // ensure player is not abale to hit the same grid again
        for(i=1;i<=10;i++){

            for(j=1;j<=10;j++){

                if(mouseX>indent+50+30*i && mouseX<indent+50+30*(i+1) && mouseY>50+30*j && mouseY<50+30*(j+1)){
                    
                    if(!mouseIsPressed){
                        
                        fill(140, 184, 250);
                        rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);
                    }
                    
                    if(mouseIsPressed){

                    
                        //fill(255, 0, 0);
                        //rect(indent+50+25*i,5+25*j,25,25);
                        
                        if( (this.gridActual[i - 1][j - 1] === 0) && (this.gridHidden[i - 1][j - 1] === 0) ){

                        this.turn++;    
                        // this deletes water block at location
                        this.gridHidden[i-1][j-1]= -1;  
                        
                        if(playerIs === 2){

                            playerOneTurn = false;
                        }

                        else{
                            playerOneTurn = true;
                        }

                        // returns when shot misses
                        //return 0; 
                        }

                        else if( ( this.gridActual[i - 1][j - 1] > 0 ) && (this.gridHidden[i - 1][j - 1] === 0) ){
                            this.turn++;
                            // subtract ships life which is hit 
                            // mark as hit on hidden grid
                            this.gridHidden[i - 1][j - 1] = 1;
                            this.shipName[ this.gridActual[i - 1][j - 1] -1 ].currLife -- ;

                            if(playerIs === 2){
                            playerOneTurn = true;
                            }
                            else{
                                playerOneTurn = false;
                            }
                            return 0;
                        }
                        
                        //player1.gridHidden[i-1][j-1]=-1;
                        
                        mouseIsPressed = false;
                    }
                    
                }

            }
        }
        // if above if statement dosnt return than extra shot 

            return 0;

    }
    return 0;

    };
    */

    var player = function(playerName,playeris){
        
        // inherits objects/attributes from network class
        networkClass.call(this);
        // inherits objects/attributes from ship class
        shipClass.call(this);
        // can an if condition come inside constructor ??
        
        this.gridHidden=[[0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0]
                            ];

        this.gridActual=[[0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0,0]
                            ]; 

        this.currLife = [ 2,3,3,4,5 ];
        this.name = playerName ;
        this.playerIs = playeris;
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;
        this.hitX;
        this.hitY;
        this.ship = [

        //patrolBoat : 
        { begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //submarine  : 
        {   begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //destroyer  : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //battleship : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //aircraftCarrier : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,

        ];

    };

    // inherit methods from playClass into player class
    //player.prototype = Object.create(playClass.prototype);

    player.prototype.drawGridActual = function(){

        var i = 1, j = 1, indent = 0;

        //
        if(this.playerIs === 2){
            indent = 500;
        }

        for(i = 0 ; i < this.shipName.length ; i++ ){

            for(j = 0; j < this.shipName[i].size; j++){

                noFill();
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
            for(j = 0; j < this.currLife[i] ; j++){
                
                fill( this.shipName[i].color.r , this.shipName[i].color.g , this.shipName[i].color.b );
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
        }


        fill(64, 54, 255);
            for(i = 1; i <= 10; i++ ){
                for(j = 1; j <= 10; j++ ){
                    
                    // draws water blocks on the map
                // if( this.gridActual[i - 1][j - 1] === 0){

                    fill(64, 54, 255);
                    rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);

                //  }
                    // draws the ships on the map
                    if(this.gridActual[i - 1][j - 1] > 0){

                    fill( this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.r , this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.g , this.shipName[ this.gridActual[i - 1][j - 1] - 1 ].color.b );    
                    ellipse(indent+ 65 + 30 * i, 65 + 30 * j , 25 , 25);
                    }
                    //noFill();
                }
            }   
    };

    player.prototype.drawGridHidden = function(){

        var i = 1, j = 1, indent = 0;
        
        //
        if(this.playerIs === 2){
            
            indent = 500;
        }
        
        fill(0,0,0);
        textSize(20);

        text("turn : "+ this.turn , 90+ indent,10 ,100 ,20);

        
        for(i = 0 ; i < this.shipName.length ; i++ ){

            for(j = 0; j < this.shipName[i].size; j++){

                noFill();
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
            for(j = 0; j < this.currLife[i] ; j++){
                
                fill( this.shipName[i].color.r , this.shipName[i].color.g , this.shipName[i].color.b );
                rect(indent + i*85 + 40 + 20*j , 40 ,20 ,25 );
            }
        }
        

        fill(64, 54, 255);

        for(i=1;i<=10;i++){
            
            for(j=1;j<=10;j++){
                
                if(this.gridHidden[i-1][j-1] === 0){
                fill(64, 54, 255);
                rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);
                }
                else if( this.gridHidden[i - 1][j - 1] > 0){
                    fill(255, 56, 63);  
                    rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30); 
                }
                else{
                    fill(50,150,250);
                    rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30); 
                }
            }
        } 
        return 0;  
    };


    player.prototype.arrangeShip = function(){

    // solve random function ceiling
        var size;
        var a,b,i,num, shipOverlapped = false;
        
        for( size = 5; size > 0; size-- ){
            // put condition for overlap check !!!!!!!!!!!!!!!!!!!!!
            
            shipOverlapped = false;
            
            num = size;

            if(size === 1 || size === 2){

                num++;

            }
            
            if(floor(random(0,2))){               // horizontal arrangement trigger       

                while(1){

                    a = floor(random(0,9));
                    b = floor(random(0,10-num));
                    
                    for( i = 0 ; i < num ; i++ ){
                        
                        if( this.gridActual[ a ][ b + i] !== 0){

                            shipOverlapped = true;

                            // break and search for a non-overlapping spot again 
                            break;
                        }	
                    }

                    if(! shipOverlapped){

                        // updates ships begin coordinate which will be sent to database
                        this.ship[size-1].begin.x=a;
                        this.ship[size-1].begin.x=b;

                        for(i = 0; i < num; i++ ){
                            
                            this.gridActual[ a ][b + i] = size;	    //  horizontal arrangement by random
                        }

                        // updates ships end coordinate which will be sent to database
                        this.ship[size - 1].end= a;
                        this.ship[size - 1].end= b+i;

                        break;   // breaks from while loop as ship is arranged successfully
                    }
                    shipOverlapped =false;
                }        

            }
            
            else{
            
                while(1){   
                
                    b = floor(random(0,9));
                    a = floor(random(0,10-num));
                    
                    for(i=0;i<num;i++){
                        
                        if( this.gridActual[a+i][b] !== 0){

                            shipOverlapped = true;
                            // break from for loop if ship overlaps
                            break;   
                        }
                
                        
                    }
                    
                    if(! shipOverlapped){

                        // updates ships begin coordinate which will be sent to database
                        this.ship[size-1].begin.x=a;
                        this.ship[size-1].begin.x=b;

                        for(i=0;i<num;i++){
                        
                            this.gridActual[a+i][b]=size;	     //  vertical arrangement by random
                            
                        }
                        // updates ships end coordinate which will be sent to database
                        this.ship[size - 1].end= a+i;
                        this.ship[size - 1].end= b;

                        break;
                    } 
                    shipOverlapped = false ;   
                
                }
            }
            
        }
            //  return 0;
    };

    player.prototype.initializeGrid = function(){

        this.gridHidden=[[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]
                        ];
        this.gridActual=[[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]
                        ]; 
        this.turn = 0;
        this.shipArranged = false;
        this.autoButtonPushed = false;
        this.confirmButtonPushed = false;  
        this.currLife = [ 2,3,3,4,5 ];  
        this.ship = [

        //patrolBoat : 
        { begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //submarine  : 
        {   begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //destroyer  : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //battleship : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,
        //aircraftCarrier : 
        {  begin : { x : 0 , y: 0 }, end : { x : 0, y : 0 }   } ,

        ];

        this.sendHtppRequest = true;
        this.startOnlineGame = false;            

    };

    player.prototype.play = function(playerIs){

        
    var indent =0 , i=1 , j=1 ;


    if( ( this.currLife[0] + this.currLife[1] + this.currLife[2] + this.currLife[3] + this.currLife[4] ) === 0){
        this.win = true;
        play= false;
        winState = true;
        return 1;
    }


    if(this.turn < 100){
        // check for win condition in each turn

        if(playerIs === 2){
            indent = 500;
        } 
        
        // ensure player is not able to hit the same grid again
        for(i=1;i<=10;i++){

            for(j=1;j<=10;j++){

                if(mouseX>indent+50+30*i && mouseX<indent+50+30*(i+1) && mouseY>50+30*j && mouseY<50+30*(j+1)){
                    
                    if(!mouseIsPressed){
                        
                        fill(140, 184, 250);
                        rect(indent + 50 + 30 * i, 50 + 30 * j, 30 , 30);
                    }
                    
                    if(mouseIsPressed){
                        /*
                        fill(255, 0, 0);
                        rect(indent+50+25*i,5+25*j,25,25);
                        */
                        if( (this.gridActual[i - 1][j - 1] === 0) && (this.gridHidden[i - 1][j - 1] === 0) ){

                        this.turn++;    
                        // this deletes water block at location
                        this.gridHidden[i-1][j-1]= -1;  
                        
                        this.hitX = i-1;
                        this.hitY = j-1;
                        //send your hit coordinates info to the server
                        // send player2.hitX and player2.hitY

                        if(playerIs === 2){

                            playerOneTurn = false;
                        }

                        else{
                            playerOneTurn = true;
                        }

                        // returns when shot misses
                        //return 0; 
                    }

                        else if( ( this.gridActual[i - 1][j - 1] > 0 ) && (this.gridHidden[i - 1][j - 1] === 0) ){

                            this.turn++;
                            // subtract ships life which is hit 
                            // mark as hit on hidden grid
                            this.gridHidden[i - 1][j - 1] = 1;
                            this.currLife[ this.gridActual[i - 1][j - 1] - 1] -- ;

                            this.hitX= i -1;
                            this.hitY = j-1;
                            //send your hit coordinates info to the server
                            // send player2.hitX and player2.hitY

                            if(playerIs === 2){
                            playerOneTurn = true;
                            }
                            else{
                                playerOneTurn = false;
                            }
                            return 0;
                        }
                        
                        //player1.gridHidden[i-1][j-1]=-1;
                        
                        mouseIsPressed = false;
                    }
                    
                }

            }
        }
        // if above if statement dosnt return than extra shot 

            return 0;

    }
    return 0;
    };
  
    player.prototype.DeployShipsReceivedFromServer = function(){

        var i=0, j=0;

        for(i = 0; i < 5 ; i++ ){
                        // ship is arranged horizontally
                            if( this.ship[i].beign.x === this.ship[i].end.x){

                                for(j = 0; j < this.shipName[i].size ; j++){

                                    this.gridActual[ this.ship[i].begin.x ][ this.ship[i].begin.y + j ] = 1;
                                }
                            }
                            //ship is arranged vertically
                            else{
                                for(j = 0; j < this.shipName[i].size ; j++){
                                    
                                    this.gridActual[ this.ship[i].begin.x +j ][ this.ship[i].begin.y ] = 1;
                                }

                            }
                        }
    };
    // class for buttons - object oriented programming
    var button = function(str , x, y){
        // buttons constructor
                this.x=x;
                this.y=y;
                this.txt = str;
                this.height = 40;
                this.width = 170;
            };

    // buttons method
    button.prototype.draw = function(){

        fill(219, 9, 219, 200);
        rect(this.x,this.y,this.width,this.height,10);
        fill(0, 0, 0);
    textSize(30);
        text(this.txt, this.x+11, this.y+30);
    };

     button.prototype.insideButton = function(){

        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
            return 1;
        }
        return 0;

     }

     button.prototype.lightUpButton = function(){

        fill(240, 218, 240,100);
        rect(this.x ,this.y ,this.width ,this.height ,10);
     }

    var createNewMultiplayerObject = function(){

        var player1 = new player("p1", 1);
        var player2 = new player("p2", 2);

    };

    var player1AutoButton = new button("auto", 50, 400);
    var player1ConfirmButton = new button("confirm", 250, 400);

    var player2ConfirmButton = new button("confirm",750, 400);
    var player2AutoButton    = new button("auto",550, 400);

    var player1 = new player("p1", 1);
    var player2 = new player("p2", 2);



    //draw function
    var draw = function() {


        background(0, 0, 255,50);

        //  draw = function(){
        //   };
        //Main menu
        if(menu === true){
            //rectangle to go around the buttons
            var posX = 400 , posY = 100;
            fill(255, 100, 0,150);
            rect(posX, posY, 400, 350, 20);
            fill(255, 255, 255);
            textSize(70);
            text("BATTLESHIP-YURI",300,20,1000,200);
            
            var playButton = new button("Multiplayer", posX+100, posY+40);
            var onlineButton = new button("Online", posX+100, posY+90);
            var instructionsButton = new button("Instructions", posX+100, posY+140);
            var creditsButton = new button("Credits", posX+100, posY + 190);
            var statisticsButton = new button("statistics", posX+100, posY + 240);
            
            playButton.draw();
            onlineButton.draw();
            instructionsButton.draw();
            creditsButton.draw();  
            statisticsButton.draw();
            
            for(var buttonY=0 ; buttonY < 6*playButton.height ; buttonY =( buttonY + playButton.height + 10) ){
                
                if(mouseX > playButton.x && mouseX < playButton.x + playButton.width && mouseY > playButton.y + buttonY && mouseY < 165 +buttonY){
                    //check to see if the mouse is pressed
                // if(!mouseIsPressed){
                        // if mouse is not pressed light up the button
                        // if(mouseY > 145+buttonY && mouseY < 165 + buttonY){
                    fill(240, 218, 240,100);
                    rect(playButton.x ,buttonY + playButton.y ,playButton.width ,playButton.height ,10);
                    //  }
                //  }
                    if(mouseIsPressed){
                        //if mouse is pressed go to play
                        if(mouseY > playButton.y && mouseY < playButton.y + playButton.height ){
                            menu = false;
                            play = true;
                            // creates new object for players and buttons for next frame 
                            createNewMultiplayerObject();
                        }
                        else if(mouseY > onlineButton.y && mouseY< onlineButton.y + onlineButton.height){
                            menu = false;
                            multiplayerOnline =true;
                        }
                        else if(mouseY > instructionsButton.y && mouseY< instructionsButton.y + instructionsButton.height){
                            menu = false;
                            instructions =true;
                        }
                        else if(mouseY > creditsButton.y && mouseY< creditsButton.y + creditsButton.height ){
                            menu = false;
                            credits =true;
                        }
                        else if(mouseY > statisticsButton.y && mouseY< statisticsButton.y + statisticsButton.height ){
                            menu = false;
                            statistics =true;
                        }
                    }
                }
            }
        }   
        
        else if(multiplayerOnline === true){

            // coming soon
            background(0, 255, 255,100);
            var backButton1 = new button("back", 400, 450);
            backButton1.draw();
            var connectButton = new button("connect",600,250);
            
            var i=0 , j=0 , x=0 , y=0;

            // draws 10*10 grid for player 1
            player1.drawGridActual();

            if(! player1.confirmButtonPushed){

                player1AutoButton.draw();
            }

            // draws 10*10 grid for player 2

            // auto button for player 1
            if(player1.shipArranged === false){

                player1AutoButton.draw();
                
                if( player1AutoButton.insideButton() ){
                    //check to see if the mouse is pressed
                    
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1AutoButton.lightUpButton();
                        
                    }
                    if(mouseIsPressed){

                        if(player1.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player1.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player1.arrangeShip();
                        player1.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }
            
            // confirm button for player1
            if(player1.autoButtonPushed){

                player1ConfirmButton.draw();

                if( player1ConfirmButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1ConfirmButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                    player1.autoButtonPushed = false ;
                    player1.shipArranged = true;
                    player1.confirmButtonPushed = true;
                        //shipArranged = true;
                    }
                }
            }

            if(player1.confirmButtonPushed && player1.sendHtppRequest ){

                connectButton.draw();

                if( connectButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        connectButton.lightUpButton();
                    }
                    if(mouseIsPressed){

                        //send http request
                        // after receiving the request server creates new database with unique id 

                        // then send the below ship coordinates to database
                        /*
                        // ship are arranged from smaller to bigger (ascending order)
                        for(i=0 ; i<5 ; i++){
                        player1.ship[i].begin.x;
                        player1.ship[i].begin.y;
                        player1.ship[i].end.x;
                        player1.ship[i].end.y;
                        }
                        */
                        // after receiving this info server implements match making by searching for an unpaired user and assigning both the users the same pairId
                        // server also decides which player will start first

                        player1.sendHtppRequest = false;
                    }
                }
            }

            // after sending deployed ship coordinates , frontend begins listening to port (in this case web socket)
            if( (player1.sendHtppRequest === false) && (player1.startOnlineGame === false)){

                // listen to port

                // frontend loads the other player ship coordinates from server from server

                        /*
                        // ship are arranged from smaller to bigger (ascending order)
                        // assign other player ship coordinates received from server to the ship coordinates below

                        for(i=0 ; i<5 ; i++){

                        player2.ship[i].begin.x =  ;
                        player2.ship[i].begin.y = ;
                        player2.ship[i].end.x =  ;
                        player2.ship[i].end.y =  ;
                        }
                        */

                            // NOTE: // implement some condition here to execute below statement only if frontend successfully recieves the data in above mentioned comments inside this if loop

                        // method call updates the received coordinates into the gridActual matrix
                        //player2.DeployShipsReceivedFromServer();

                // frontend also loads if it is the first player from server
                // playerOneTurn = false; // if other player starts first
                // playerOneTurn = true;  // if current player starts first



                // implement some condition here to execute below statement only if frontend successfully recieves the data in above mentioned comments inside this if loop
                player1.startOnlineGame = true;

            }

            if(player1.startOnlineGame){
                // if both players have deployed ships start the game
               
                // main multiplayer pass N play if statement
                if(player1.confirmButtonPushed){

                    if(playerOneTurn){

                            if( player2.play(2) === true){
                                winState = true ;
                                play = false;
                            }
                        
                        // inside play method call on line number 547 and 573 write method call to send this.hitX and this.hitY to the server

                    }
                    else{ 
                        // listen to hit coordinates of your opponent and assign them to variables below
                        // listen to opponents hit coordinates 
                        // player1.hitX= ;
                        // player1.hitY= ;

                        //player1.gridHidden[ hitX ][ hitY ] = 1;
   
                    }

                }


                // draws opponents map on the screen
                player2.drawGridHidden();

            }
            // back button  - common for both the players
            if(backButton1.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    backButton1.lightUpButton();
            
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    multiplayerOnline = false;
                    menu = true;
                    //createNewMultiplayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                    //mouseIsPressed = false;
                }
            }
        }
        
        //Credits
        else if(credits === true){
            //background
        // image(space, 0, 0, 400, 400);
            //text
            fill(255, 0, 0);
            text("1) aj941 \n2)\n3)\n4)", 150, 150);
            //make button
            var backButton = new button("back",150,300);
            backButton.draw();
            //if the mouse is in the same place as the button
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y +backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    credits = false;
                    menu = true;
                }
            }
        }
        //instructions
        else if(instructions === true){
            //background
            //image(space, 0, 0, 400, 400);
            //text
            textSize(20);
            fill(255, 0, 0);
            text("Instructions", 0, 15);
            textSize(15);
            text("1)\n2)\n3)\n4)\n5)\n6)", 20, 40);
        //make button
        var backButton = new button("back",150,300);
            backButton.draw();
            //if the mouse is in the same place as the button
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y + backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                    fill(0, 0, 0);
                    text("Back", 184, 315);
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    instructions = false;
                    menu = true;
                }
            }
        }
        //play
        else if(play === true){
            //background
            background(0, 255, 255,100);
            var backButton1 = new button("back", 400, 450);
            backButton1.draw();
            
            var i=0 , j=0 , x=0 , y=0;

            // draws 10*10 grid for player 1
            if(! player1.confirmButtonPushed){

                player1.drawGridActual();
                player1AutoButton.draw();
            }
            else{
                player1.drawGridHidden();
            }

            // draws 10*10 grid for player 2
            if(! player2.confirmButtonPushed){

                player2.drawGridActual();
                player2AutoButton.draw();
            }
            else{
                player2.drawGridHidden();
            }

            // auto button for player 1
            if(player1.shipArranged === false){

                player1AutoButton.draw();
                
                if(player1AutoButton.insideButton()){
                    //check to see if the mouse is pressed
                    
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1AutoButton.lightUpButton();
                        
                    }
                    if(mouseIsPressed){

                        if(player1.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player1.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player1.arrangeShip();
                        player1.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }
            
            // confirm button for player1
            if(player1.autoButtonPushed){

                player1ConfirmButton.draw();

                if(player1ConfirmButton.insideButton()){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player1ConfirmButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                    player1.autoButtonPushed = false ;
                    player1.shipArranged = true;
                    player1.confirmButtonPushed = true;
                        //shipArranged = true;
                    }
                }
            }

            // auto button for player 2 
            if(player2.shipArranged === false){

                player2AutoButton.draw();

                if( player2AutoButton.insideButton() ){
                    //check to see if the mouse is pressed
                    if(!mouseIsPressed){
                        //if mouse is not pressed then light up button
                        player2AutoButton.lightUpButton();
                    }
                    if(mouseIsPressed){
                        if(player2.autoButtonPushed === true){
                            // initializes grid for player 1 
                            player2.initializeGrid();
                            //createNewMultiplayerObject();
                        }
                        player2.arrangeShip();
                        player2.autoButtonPushed = true ;
                        //shipArranged = true;
                    }
                }
            }

                // confirm button for player2
                if( player2.autoButtonPushed ){

                    player2ConfirmButton.draw();

                    if(player2ConfirmButton.insideButton() ){
                        //check to see if the mouse is pressed
                        if(!mouseIsPressed){
                            //if mouse is not pressed then light up button
                        player2ConfirmButton.lightUpButton();

                        }
                        if(mouseIsPressed){
                            
                        player2.autoButtonPushed = false ;
                        player2.confirmButtonPushed = true;
                        player2.shipArranged = true;
                            //shipArranged = true;
                        }
                    }
                }

                // if both players have deployed ships start the game
                
                // main multiplayer pass N play if statement
                if(player1.confirmButtonPushed && player2.confirmButtonPushed){

                    if(playerOneTurn){

                            if( player2.play(2) === true){
                                // make separate class for win 
                                winState = true ;
                                play = false;
                            }
                    }
                    else{ 
                        if( player1.play(1) === true){
                            winState = true;
                            play = false;
                        }     
                    }

                }

            // back button  - common for both the players
            if(backButton1.insideButton() ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    //if mouse is not pressed then light up button
                    backButton1.lightUpButton();
            
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    play = false;
                    menu = true;
                    createNewMultiplayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                    //mouseIsPressed = false;
                }
            }
        }

        else if(statistics === true){

            var backButton = new button("back",150,300);
            backButton.draw();
            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y +backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){
                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    statistics = false;
                    menu = true;
            }
            } 
        }      

        else if( winState === true ){

            // display victory message too
            if(player1.win === true ){
                textSize(40);
                text("Player 2 Wins !!!",400,400,400,400);
                player2.drawGridActual();
            }
            else{
                textSize(40);
                text("Player 1 Wins !!!",400,400,400,400);
                player1.drawGridActual();
            }

            var backButton = new button("Menu",150,450);
            backButton.draw();

            if(mouseX > backButton.x && mouseX < backButton.x + backButton.width && mouseY > backButton.y && mouseY < backButton.y + backButton.height ){
                //check to see if the mouse is pressed
                if(!mouseIsPressed){

                    fill(240, 218, 240,100);
                    rect(backButton.x, backButton.y, backButton.width, backButton.height );
                }
                if(mouseIsPressed){
                    //if mouse is pressed go to menu
                    winState = false;
                    menu = true;
                    createNewMultiplayerObject();
                    player1.initializeGrid();
                    player2.initializeGrid();
                }
            }
        }    

    };

    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc); 
