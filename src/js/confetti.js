class ConfettiParticle {
    constructor(W, H, possibleColors, context) {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = Math.floor(Math.random() * (33 - 11 + 1) + 11);
        this.d = Math.random() * W + 11;
        this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 22) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
        this.context = context;
    }

    draw() {
        this.context.beginPath();
        this.context.lineWidth = this.r / 2;
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        this.context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return this.context.stroke();
    }
}


export default class Confetti {
    constructor(canvasId, maxConfettis) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = document.getElementById(canvasId);
        this.animationId = null;
        this.context = this.canvas.getContext("2d");
        this.maxConfettis = maxConfettis;
        this.particles = [];
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.possibleColors = [
            "purple",
            "Violet",
            "orange",
            "gold"
        ];
        this.addConfetties()
        this.setEventListeners(this.canvas);

    }
    randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
    addConfetties() {
        for (var i = 0; i < this.maxConfettis; i++) {
            this.particles.push(new ConfettiParticle(this.width, this.height, this.possibleColors, this.context));
        }
    }
    removeConfetties() {
        
    }
    draw() {
        const results = [];
        this.animationId = requestAnimationFrame(this.draw.bind(this));
        this.context.clearRect(0, 0, this.width, this.height);
    
        for (let i = 0; i < this.particles.length; i++) {
            results.push(this.particles[i].draw());
    
            this.particles[i].tiltAngle += this.particles[i].tiltAngleIncremental;
            this.particles[i].y += (Math.cos(this.particles[i].d) + 3 + this.particles[i].r / 2) / 2;
            this.particles[i].tilt = Math.sin(this.particles[i].tiltAngle - i / 3) * 15;
    
            if (this.particles[i].y > this.height) {
                this.particles.splice(i, 1);
                i--;
            } else if (this.particles[i].x > this.width + 30 || this.particles[i].x < -30) {
                this.particles[i].x = Math.random() * this.width;
                this.particles[i].y = -30;
                this.particles[i].tilt = Math.floor(Math.random() * 10) - 20;
            }
        }
    
        return results;
    }
    

    startConfetti(time) {
        this.addConfetties();
        this.draw();
        setTimeout(() => {
            this.stopConfetti();
        }, time);
    }

    stopConfetti() {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.context.clearRect(0, 0, this.width, this.height);
    }

    setEventListeners(canvas) {
        window.addEventListener(
            "resize",
            function() {
              this.width = window.innerWidth;
              this.height = window.innerHeight;
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            },
            false
        );
    }

}








