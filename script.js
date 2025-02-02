window.onload = function() {
    const flowersCanvas = document.getElementById('flowersCanvas');
    const flowersCtx = flowersCanvas.getContext('2d');

    flowersCanvas.width = window.innerWidth;
    flowersCanvas.height = window.innerHeight;

    function drawFlower(x, y, petalCount, petalLength, petalColor) {
        flowersCtx.save();
        flowersCtx.translate(x, y);

        for (let i = 0; i < petalCount; i++) {
            flowersCtx.rotate((Math.PI * 2) / petalCount);
            flowersCtx.beginPath();
            flowersCtx.moveTo(0, 0);
            flowersCtx.lineTo(petalLength, 0);
            flowersCtx.arcTo(petalLength + 10, 10, petalLength, 20, 10);
            flowersCtx.lineTo(0, 0);
            flowersCtx.fillStyle = petalColor;
            flowersCtx.fill();
        }

        flowersCtx.restore();
    }

    function drawRandomFlowers() {
        const flowerCount = 10;
        const petalColors = ['#FF69B4', '#FF1493', '#DB7093', '#C71585'];

        for (let i = 0; i < flowerCount; i++) {
            const x = Math.random() * flowersCanvas.width;
            const y = Math.random() * flowersCanvas.height;
            const petalCount = Math.floor(Math.random() * 5) + 5;
            const petalLength = Math.random() * 50 + 30;
            const petalColor = petalColors[Math.floor(Math.random() * petalColors.length)];

            drawFlower(x, y, petalCount, petalLength, petalColor);
        }
    }

    drawRandomFlowers();

    const acceptButton = document.getElementById('acceptButton');
    const message = document.getElementById('message');
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const fireworksCtx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    acceptButton.addEventListener('click', () => {
        message.innerText = '¡Te amo!';
        message.style.display = 'block';
        launchFireworks();
    });

    function launchFireworks() {
        const fireworks = [];
        const gravity = 0.1;

        function Firework(x, y) {
            this.x = x;
            this.y = y;
            this.radius = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.velocity = {
                x: (Math.random() - 0.5) * 6,
                y: Math.random() * -4 - 4
            };
        }

        Firework.prototype.update = function() {
            this.velocity.y += gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.radius *= 0.98;
        };

        Firework.prototype.draw = function() {
            fireworksCtx.beginPath();
            fireworksCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            fireworksCtx.fillStyle = this.color;
            fireworksCtx.fill();
        };

        function animate() {
            requestAnimationFrame(animate);
            fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

            for (let i = fireworks.length - 1; i >= 0; i--) {
                if (fireworks[i].radius < 0.5) {
                    fireworks.splice(i, 1);
                } else {
                    fireworks[i].update();
                    fireworks[i].draw();
                }
            }

            if (Math.random() < 0.05) {
                fireworks.push(new Firework(Math.random() * fireworksCanvas.width, fireworksCanvas.height));
            }
        }

        animate();
    }
};