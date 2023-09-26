import styles from './style.module.scss';

const widgetContainers = document.getElementsByClassName(
  'paperknife-container'
);

for (let i = 0; i < widgetContainers.length; i++) {
  const widgetContainer = widgetContainers[i];

  widgetContainer.classList.add(styles.widgetContainer);

  widgetContainer.addEventListener('click', function () {
    const overlayElement = document.createElement('div');
    overlayElement.className = styles.overlay;
    overlayElement.id = 'paperknife-overlay';

    const existingOverlayElement =
      document.getElementById('paperknife-overlay');

    if (existingOverlayElement) {
      existingOverlayElement.className = styles.overlay;

      const existingIframeElement = document.getElementById(
        'paperknife-iframe'
      );

      if (existingIframeElement) {
        existingIframeElement.className = [styles.iframe, styles.right].join(' ');
        existingIframeElement.contentWindow.postMessage(
          {
            type: 'widgetStatus',
            status: 'active',
            active: true,
          },
          '*'
        );
      }

    } else {
      document.body.appendChild(overlayElement);

      const iframeContainer = document.createElement('div');
      iframeContainer.className = styles.iframeContainer;
      overlayElement.appendChild(iframeContainer);

      const iframeElement = document.createElement('iframe');
      iframeElement.id = 'paperknife-iframe';
      iframeElement.className = [styles.iframe, styles.right].join(' ');

      // TODO: Replace with the URL from embedded widget
      iframeElement.setAttribute(
        'src',
        process.env.NODE_ENV === 'production'
          ? 'https://demo.paperknife.app/changelog/embed'
          : 'http://demo.localhost:3000/changelog/embed'
      );

      overlayElement.addEventListener('click', function () {
        overlayElement.className = [styles.overlay, styles.hidden].join(' ');

        const existingIframeElement =
          document.getElementById('paperknife-iframe');

        if (existingIframeElement) {
          existingIframeElement.className = [styles.iframe, styles.hidden].join(
            ' '
          );
          existingIframeElement.contentWindow.postMessage(
            {
              type: 'widgetStatus',
              status: 'inactive',
              active: false,
            },
            '*'
          );
        }
      });
      iframeContainer.appendChild(iframeElement);
    }
  });
}
