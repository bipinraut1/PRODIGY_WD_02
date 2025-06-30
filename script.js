class Stopwatch {
    constructor() {
        // DOM elements
        this.display = document.querySelector('.display');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapTimes = document.getElementById('lapTimes');

        // Variables
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.lapCount = 1;

        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
    }

    // Format time in HH:MM:SS
    formatTime(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor(ms / (1000 * 60 * 60));

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update display
    updateDisplay() {
        const currentTime = Date.now() - this.startTime + this.elapsedTime;
        this.display.textContent = this.formatTime(currentTime);
    }

    // Start the stopwatch
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now();
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
        }
    }

    // Pause the stopwatch
    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.elapsedTime += Date.now() - this.startTime;
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    // Reset the stopwatch
    reset() {
        clearInterval(this.intervalId);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.lapCount = 1;
        this.display.textContent = '00:00:00';
        this.lapTimes.innerHTML = '';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
    }

    // Record lap time
    lap() {
        const currentTime = Date.now() - this.startTime + this.elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${this.lapCount} - ${this.formatTime(currentTime)}`;
        this.lapTimes.insertBefore(lapItem, this.lapTimes.firstChild);
        this.lapCount++;
    }
}

// Initialize the stopwatch
const stopwatch = new Stopwatch();