/**
 * This library create the magnifying glass effect 
 * on a given container. 
 * 
 * It should be one instance per magnifying box.
 * @author Delvi Marte <delvi.marte@gmail.com>
 * @link 
 */
class Magnify {
  /**
   * @param {Element} element The box container.
   */
  constructor(element) {
    this.$x = 0;
    this.$y = 0;
    this.$box = element;
    this.$level = +element.dataset.zoom || 1;
    this.$zoom = document.createElement("div");
    this.initializeBox();
    this.initializeZoom();
  }

  /**
   * When click / touch down on the zoomer.
   * @param {MouseEvent|TouchEvent} event 
   * @returns {void}
   */
  whenDown(event) {
    const offsetX = this.$zoom.offsetLeft;
    const offsetY = this.$zoom.offsetTop;
    // Set the mouse position
    this.$x = offsetX - event.pageX;
    this.$y = offsetY - event.pageY;
  }
  
  /**
   * When any movement dragging the zoomer element.
   * 
   * @param {MouseEvent|TouchEvent} event 
   * @returns {void}
   */
  whenMove(event) {
    let offsetX = Math.abs(this.$x);
    let offsetY = Math.abs(this.$y);

    let positionX = event.pageX - offsetX;
    let positionY = event.pageY - offsetY;

    if (!this.isOutOfBound(this.$zoom, positionX, positionY)) {
      this.movePosition(this.$zoom, positionX, positionY);
    }
  }

  /**
   * Initialize the main box wrapper.
   * @returns {void}
   */
  initializeBox() {
    this.$box.style.backgroundImage = `url("${this.$box.dataset.background}")`;
  }

  /**
   * Initialize the zoomer element.
   * @returns {void}
   */
  initializeZoom() {
    const bgWidth = this.$box.offsetWidth * this.$level;
    const bgHeight = this.$box.offsetHeight * this.$level;

    this.$zoom.draggable = true;
    this.$zoom.className = "magnify-zoom";
    this.$box.append(this.$zoom);

    this.$zoom.style.setProperty(
      "left",
      `calc(50% - ${this.$zoom.offsetWidth / 2}px)`
    );
    this.$zoom.style.setProperty(
      "top",
      `calc(50% - ${this.$zoom.offsetHeight / 2}px)`
    );
    this.$zoom.style.backgroundImage = `url("${this.$box.dataset.foreground}")`;
    this.$zoom.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
    this.$zoom.style.setProperty(
      "background-position",
      `calc(50% + 4%) calc(50% + 4%)`
    );

    this.initializeMobileEvents();
    this.initializeDesktopEvents();
  }

  /**
   * Mobile / Tablets handler
   * @returns {void}
   */
  initializeMobileEvents() {
    const onmove = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.whenMove(ev.touches[0]);
    };

    document.addEventListener(
      "touchstart",
      (ev) => {
        // Only activate when touch the zoom container
        if (!this.$zoom.contains(ev.target)) {
          return;
        }

        document.addEventListener("touchmove", onmove, { passive: false });
        this.whenDown(ev.touches[0]);
      },
      { passive: false }
    );

    document.addEventListener(
      "touchend",
      () => {
        document.removeEventListener("touchmove", onmove);
      },
      { passive: false }
    );
  }

  /**
   * Desktop events handler.
   * @returns {void}
   */
  initializeDesktopEvents() {
    document.addEventListener("mousedown", (ev) => {
      // Only activate when click on magnifier square
      if (!this.$zoom.contains(ev.target)) {
        return;
      }

      this.whenDown(ev);

      const onmove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.whenMove(e);
      };

      document.addEventListener("mousemove", onmove);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onmove);
      });
    });
  }

  /**
   * Check if the current position is out of the bounding box on left side.
   * 
   * @param {Element} element 
   * @param {number} positionX
   * @returns {boolean}
   */
  isOutOfXLeft(element, positionX) {
    return positionX < element.offsetLeft && element.offsetLeft <= 0;
  }

  /**
   * Check if the current position is out of the bounding box on right side.
   * 
   * @param {Element} element 
   * @param {number} positionX
   * @returns {boolean}
   */
  isOutOfXRight(element, positionX) {
    return (
      positionX > element.offsetLeft && this.$box.offsetWidth - element.offsetWidth - element.offsetLeft <= 0
    );
  }

  /**
   * Check if the current position is out of the bounding box on top side.
   * 
   * @param {Element} element 
   * @param {number} positionY 
   * @returns {boolean}
   */
  isOutOfYTop(element, positionY) {
    return positionY < element.offsetLeft && element.offsetTop <= 0;
  }

  /**
   * Check if the current position is out of the bounding box on bottom side.
   * 
   * @param {Element} element 
   * @param {number} positionY
   * @returns {boolean}
   */
  isOutOfYBottom(element, positionY) {
    return (
      positionY > element.offsetTop && this.$box.offsetHeight - element.offsetHeight - element.offsetTop <= 0
    );
  }

  /**
   * Verify if the current position of the zoomer is out of the bounding box.
   * 
   * @param {Element} element 
   * @param {number} positionX 
   * @returns {boolean}
   */
  isOutOfBound(element, positionX, positionY) {
    return (
      this.isOutOfXLeft(element, positionX) ||
      this.isOutOfXRight(element, positionX) ||
      this.isOutOfYTop(element, positionY) ||
      this.isOutOfYBottom(element, positionY)
    );
  }

  /**
   * Move a given element to a given position
   * and the background image of the element.
   * 
   * This method is in charge of create the zoom in effect.
   * 
   * @param {Element} element 
   * @param {number} positionX 
   * @param {number} positionY 
   * @returns {void}
   */
  movePosition(element, positionX, positionY) {
    element.style.top = `${positionY}px`;
    element.style.left = `${positionX}px`;

    this.moveBackground(element, positionX, positionY);
  }

  /**
   * Move the background of a given element.
   * 
   * @param {Element} element The HTML Element type.
   * @param {number} positionX The desired position of X.
   * @param {number} positionY The desidred position of Y.
   */
  moveBackground(element, positionX, positionY) {
    element.style.setProperty(
      "background-position-x",
      `calc(-1% - ${positionX + Math.abs(positionX * 0.8) * this.$level}px)`
    );
    element.style.setProperty(
      "background-position-y",
      `calc(-1% - ${positionY + Math.abs(positionY * 0.7) * this.$level}px)`
    );
  }
}

// Initialize
((elements) => {
  for (const element of elements) {
    new Magnify(element);
  }
})(document.getElementsByClassName("magnify-box"));
