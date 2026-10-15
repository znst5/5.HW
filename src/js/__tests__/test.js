import { PopoverWidget } from '../popover';

jest.mock('../../css/style.css', () => ({}));

describe('PopoverWidget JSDOM Tests', () => {
  let widget;
  let btn;

  beforeEach(() => {
    btn = document.createElement('button');
    btn.id = 'popover-btn';
    btn.textContent = 'Click to toggle popover';

    btn.setAttribute('data-title', 'Popover title');
    btn.setAttribute('data-content', `And here's some amazing content. It's very engaging. Right?`);

    document.body.appendChild(btn);
    widget = new PopoverWidget('popover-btn');
    widget.init();
  });

  afterEach(() => {
    btn.remove();
    if (widget.currentPopover) {
      widget.currentPopover.remove();
    }
  });

  test('should add popover element to DOM on first click', () => {
    expect(document.querySelector('popover')).toBeNull();
    btn.click();

    const popover = document.querySelector('.popover');
    expect(popover).not.toBeNull();

    expect(popover.querySelector('.popover-title').textContent).toBe('Popover title');
    expect(popover.querySelector('.popover-content').textContent).toBe(`And here's some amazing content. It's very engaging. Right?`);
  });

  test('should remove popover element from DOM on second click', () => {
    btn.click();
    expect(document.querySelector('.popover')).not.toBeNull();

    btn.click();
    expect(document.querySelector('.popover')).toBeNull();
  });
});
