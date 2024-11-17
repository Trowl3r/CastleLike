
export default class Timer {
  private startTime: number = 0; // When the timer started
  private elapsedTime: number = 0; // Time elapsed while timer is running
  private running: boolean = false; // Is the timer currently running?

  start() {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime; // Resume from previous elapsed time
      this.running = true;
    }
  }

  // Stop/pause the timer and save elapsed time
  stop() {
    if (this.running) {
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  }

  // Reset the timer to 0
  reset() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }

  // Get the total elapsed time in milliseconds
  getElapsedTime(): number {
    if (this.running) {
      return Date.now() - this.startTime;
    }
    return this.elapsedTime;
  }

  getTotalSeconds() {
    return Math.floor(this.getElapsedTime() / 1000);
  }

  // Get the elapsed time formatted as "mm:ss"
  getFormattedTime(): string {
    const totalSeconds = this.getTotalSeconds();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
