let part = [];
let partNumber = 20000;
let collisionIndex = {};
let collision = [];
let drag = .95;

function setup(){
	createCanvas(800, 800);
	for (var i = 0; i < partNumber; i++) {
		part[i] = new Particle(i, drag);
	}
}

function draw(){
	collisionIndex = new Object();
	collision = [];
	background(0);
	fill(255);
	noStroke();
	loadPixels();
	for (let i = 0; i < partNumber; i++) {
		part[i].display();
		part[i].move();
		part[i].gravity();
		part[i].mouse();
		part[i].edge();
		part[i].compare();
		
	}
	for (let i = 0; i < collision.length; i++) {
		part[collision[i]].collide();
		
	}
	updatePixels();
	console.log(collision.length);

}

class Particle {
	constructor(index, friction) {
		this.x = random(width);
		this.y = random(height);
		this.directionX = random(-1,1);
		this.directionY = random(-1,1);
		this.scale = 1;
		this.pX = 0;
		this.pY = 0;
		this.position = [];
		this.ID = index;
		this.drag = friction;

	}

	move() {
		this.directionX = this.directionX * drag;
		this.directionY = this.directionY * drag;
		this.x = this.x + this.directionX;
		this.y = this.y + this.directionY;
		this.pX = this.x.toFixed(0);
		this.pY = this.y.toFixed(0);
		this.position = [this.pX, this.pY];
		this.pullX;
		this.pullY;

	}
	
	//affect particles with the mouse
	mouse() {
		if(mouseIsPressed){
			this.pullX = (mouseX - this.x)/width;
			this.pullY = (mouseY - this.y)/height;
			this.directionX = this.directionX + this.pullX * 4;
			this.directionY = this.directionY + this.pullY * 4;
		}
	}
	
	//compare positions to determine if a collision has happened
	compare(){
		if(!collisionIndex[this.position]){ 
			collisionIndex[this.position] = this.ID;		
		}else{
			collision.push(this.ID);
			collision.push(collisionIndex[this.position]);
		}
	}

	//behavior on collision
	collide(){		
			this.directionX *= -.5;
			this.directionY *= -.5;
			this.x = this.x + random(-.25, .25);
			this.y = this.y + random(-.25, .25);
			//this.scale = this.scale + random(-1,1);
			
							
		
	}
	
	gravity(){
		this.directionY += 1;
		
	}
	
	//bounce off edges
	edge(){
		if(this.x > width){
			this.directionX *= -.5;
			this.x = width - (this.x - width);
		}else if (this.x < 0){
			this.directionX *= -.5;
			this.x = abs(this.x);
			
		}
		
		if(this.y > height){
			this.directionY *= -.5;
			this.y = height - (this.y - height);
		}else if (this.y < 0){
			this.directionY *= -.5;
			this.y = abs(this.y);
			
		}
	}
	
	display() {
		//rectMode(CENTER);
		//rect(this.x, this.y, this.scale, this.scale);
		set(this.x,this.y,255);
		

	}
}