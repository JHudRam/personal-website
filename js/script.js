document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const words = ['Philosopher', 'Founder', 'Innovator', 'Builder'];
    const typewriter = document.getElementById('typewriter');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 750); // 750ms pause when word is complete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 15 : 30; // Fast typing speed
        const delay = isWaiting ? 0 : typingSpeed;

        setTimeout(typeEffect, delay);
    }

    typeEffect();

    // Initialize floating quotes with specific positions
    const quotes = document.querySelectorAll('.floating-quote');
    const positions = [
        { top: '15%', left: '15%', animation: 'float-1' },
        { top: '50%', left: '85%', animation: 'float-2' },
        { top: '85%', left: '25%', animation: 'float-3' }
    ];

    quotes.forEach((quote, index) => {
        quote.style.top = positions[index].top;
        quote.style.left = positions[index].left;
        quote.style.animationName = positions[index].animation;
        quote.style.animationDuration = '15s';
        quote.style.animationIterationCount = 'infinite';
        quote.style.animationTimingFunction = 'linear';
    });

    // Add hover effects for brain regions
    const hoverIndicator = document.getElementById('hover-indicator');
    const areas = document.querySelectorAll('area[data-region]');

    areas.forEach(area => {
        area.addEventListener('mouseover', function() {
            const coords = this.coords.split(',');
            const region = this.getAttribute('data-region');
            
            // Update hover indicator
            hoverIndicator.style.left = `${coords[0]}px`;
            hoverIndicator.style.top = `${coords[1]}px`;
            hoverIndicator.style.opacity = '1';
            
            // Add pulse effect
            hoverIndicator.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                hoverIndicator.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);

            // Highlight corresponding label
            const label = document.querySelector(`.brain-label[data-region="${region}"]`);
            if (label) {
                label.style.color = '#D4B483';
                label.style.transform = 'translate(-50%, -50%) scale(1.1)';
                label.style.fontWeight = 'bold';
                label.style.textShadow = '0 0 5px rgba(212, 180, 131, 0.3)';
                label.style.background = 'rgba(44, 24, 16, 0.9)';
            }
        });

        area.addEventListener('mouseout', function() {
            hoverIndicator.style.opacity = '0';
            
            const region = this.getAttribute('data-region');
            const label = document.querySelector(`.brain-label[data-region="${region}"]`);
            if (label) {
                label.style.color = 'rgba(212, 180, 131, 0.7)';
                label.style.transform = 'translate(-50%, -50%) scale(1)';
                label.style.fontWeight = 'normal';
                label.style.textShadow = 'none';
                label.style.background = 'rgba(44, 24, 16, 0.8)';
            }
        });

        area.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            window.location.href = `pages/${region}.html`;
        });
    });

    // Function to draw lines between points (for coordinate system if needed)
    function drawLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'click-line';
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = length + 'px';
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        
        return line;
    }

    // Clear function for coordinate system (can be called from console if needed)
    window.clearCoordinates = function() {
        const clickPoints = document.getElementById('click-points');
        if (clickPoints) {
            while (clickPoints.firstChild) {
                clickPoints.removeChild(clickPoints.firstChild);
            }
        }
        console.log('Coordinates cleared');
    };
});