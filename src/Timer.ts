
export default class Timer {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;
  private frozen: boolean = false;

  // Start or resume the timer
  start() {
    if (!this.running && !this.frozen) {
      this.startTime = Date.now() - this.elapsedTime;
      this.running = true;
    }
  }

  // Stop/pause the timer and save elapsed time
  stop() {
    if (this.running && !this.frozen) {
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  }

  // Reset the timer to 0
  reset() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this.frozen = false;
  }

  // Get the total elapsed time in milliseconds
  getElapsedTime(): number {
    if (this.frozen) {
      return this.elapsedTime;
    }

    if (this.running) {
      return Date.now() - this.startTime;
    }
    return this.elapsedTime;
  }

  // Get the total elapsed time in seconds
  getTotalSeconds(): number {
    return Math.floor(this.getElapsedTime() / 1000);
  }

  // Get the elapsed time formatted as "mm:ss"
  getFormattedTime(): string {
    const totalSeconds = this.getTotalSeconds();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  // Freeze the timer (stop it from advancing)
  freeze() {
    if (!this.frozen) {
      this.elapsedTime = this.getElapsedTime(); // Save the current elapsed time when frozen
      this.frozen = true;
    }
  }

  // Unfreeze the timer (resume it)
  unfreeze() {
    if (this.frozen) {
      this.frozen = false;
      this.startTime = Date.now() - this.elapsedTime;
      this.start(); // Resume the timer from where it was
    }
  }

  // Check if the timer is currently frozen
  isFrozen(): boolean {
    return this.frozen;
  }
}
