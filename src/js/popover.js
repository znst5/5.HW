import '../css/style.css';

export class PopoverWidget {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    this.currentPopover = null;
  }

  init() {
    if (!this.button) return;
    this.button.addEventListener('click', () => this.togglePopover());
  }

  togglePopover() {
    if (this.currentPopover) {
      this.currentPopover.remove();
      this.currentPopover = null;
      return;
    }

    const popover = this.createPopoverElement();
    document.body.appendChild(popover);
    this.currentPopover = popover;
    this.positionPopover(popover);
  }

  createPopoverElement() {
    const popover = document.createElement('div');
    popover.classList.add('popover');

    const title = document.createElement('h3');
    title.classList.add('popover-title');
    title.textContent = this.button.getAttribute('data-title');

    const content = document.createElement('div');
    content.classList.add('popover-content');
    content.textContent = this.button.dataset.content;

    const arrow = document.createElement('div');
    arrow.classList.add('popover-arrow');

    popover.appendChild(title);
    popover.appendChild(content);
    popover.appendChild(arrow);

    return popover;
  }

  positionPopover(popover) {
    const btnCoords = this.button.getBoundingClientRect();
    const left = btnCoords.left + window.scrollX + (this.button.offsetWidth / 2) - (popover.offsetWidth / 2);
    const top = btnCoords.top + window.scrollY - popover.offsetHeight - 10;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }
}
