import React from 'react'
import ReactDOM from 'react-dom'
import FooterApp from './FooterApp'

const getQueryParam = (fullUrl = '', variableToFind) => {
  const cleanedUrl = fullUrl.indexOf('?') !== -1 ? fullUrl.substring(fullUrl.indexOf('?') + 1) : '';
  if (!cleanedUrl) {
    return '';
  }

  const queryParams = cleanedUrl.split('&');
  let value = '';

  queryParams.forEach((query) => {
    const pair = query.split('=');
    if (pair[0] === variableToFind) {
      value = pair[1];
    }
  });

  return value;
};

(function renderFooterApp(window, document) {
  function loadFooter(fn) {
    // When the DOM is not loading, we can access the DOM and the elements
    // on the page. If it's still loading, we can listen for the
    // DOMContentLoaded event and then run the function.
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  function footer() {
    if (typeof window !== 'undefined') {
      let isRenderedByServer = false;

      // ReactDOM.render(
      //   <FooterApp />,
      //   document.getElementById('root') as any
      // );
      console.log('footer about to render.');;

      // Render Client Side Only
      if (!isRenderedByServer) {
        let urlType = '';
        let allScriptTags;
        let styleTag;
        let scriptTag;
        let appEnv;
        let skipNavElem;
        let skipNavAdded;

        // create element to hold the single footer instance.
        const htmlElement = document.createElement('div');
        let containerId;
        htmlElement.id = 'nypl-dgx-footer';

        // Make a global object to store the instances of nyplFooter
        if (!(window as any).nyplFooter) {
          (window as any).nyplFooter = {};
        }

        // Short-name reference to window.nyplFooter
        const nyplFooterObject = (window as any).nyplFooter;

        // Keep track of the processed scripts within nyplFooter
        if (!nyplFooterObject.processedScripts) {
          nyplFooterObject.processedScripts = [];
        }

        // Keep track of the processed style tags within nyplFooter
        if (!nyplFooterObject.styleTags) {
          nyplFooterObject.styleTags = [];
        }

        // Only create the nyplFooter if the global.nyplFooterObject.scripts is empty
        if (nyplFooterObject.processedScripts.length === 0) {
          /*
          * Loop through all <script> tags in the DOM.
          * Find the match which contains 'dgx-footer.min.js'.
          * Insert the markup holding the NYPL footer
          * right before the <script> tag matched.
          * In addition, setup the proper client appEnv
          * to fetch the modeled data endpoint.
          */
          allScriptTags = document.getElementsByTagName('script');

          /* Since getElementsBy is an array-like structure,
          * we need to use call to iterate with forEach.
          */
          [].forEach.call(allScriptTags, (value, index) => {
            console.log("each", value);
            if (value.src.indexOf('footer-latest') !== -1) {
              scriptTag = value;

              // Parse urls param from src string.
              const urlTypeAdded = getQueryParam(scriptTag.src, 'urls');
              if (urlTypeAdded) {
                urlType = urlTypeAdded;
              }

              skipNavAdded = getQueryParam(scriptTag.src, 'skipNav');
              if (skipNavAdded) {
                skipNavElem = {
                  target: skipNavAdded,
                };
              }

              containerId = getQueryParam(scriptTag.src, 'containerId');
              console.log("containerId", containerId);
              // If an element id is passed in, append the footer to that
              // element. This assumes the element is already on the page.
              // Otherwise, append the footer to the body on the element
              // that was created in this script.
              if (!containerId) {
                scriptTag.parentNode.insertBefore(htmlElement, scriptTag);
              }
              nyplFooterObject.processedScripts.push(scriptTag);
            }
          });


        }

        // Now we ensure that only ONE <script> tag has been created
        // before allowing React to Render the footer.
        if (nyplFooterObject.processedScripts.length === 1 &&
          (containerId || htmlElement)) {
          setTimeout(() => {
            ReactDOM.render(
              <FooterApp />,
              containerId ? document.getElementById(containerId) as any : htmlElement,
            );
            console.log('footer rendered via client');
          },500);
        }
      }
    }
  }
  loadFooter(footer);
}(window, document));
