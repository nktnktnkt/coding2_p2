let part = {};
let partNumber = 800;

function setup(){
	createCanvas(800, 800);
	for (var i = 0; i < partNumber; i++) {
		part[i] = new Particle;
	}
}

function draw(){
	background(0);
	fill(255);
	noStroke();
	for (var i = 0; i < partNumber; i++) {
		part[i].display();
		part[i].move();
		part[i].edge();
	}

}

class Particle {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.directionX = random(-2,2);
		this.directionY = random(-2,2);

	}

	move() {
		this.x = this.x + this.directionX;
		this.y = this.y + this.directionY;

	}

	display() {
		rectMode(CENTER);
		rect(this.x, this.y, 4, 4);

	}

	edge(){
		if(this.x > width || this.x < 0){
			this.directionX = (this.directionX*-1);
		}
		if(this.y > height || this.y < 0){
			this.directionY = (this.directionY*-1);
		}
	}
}