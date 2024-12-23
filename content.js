(function() {
    let runCount = 0;

    function adjustContent() {
        // Adjust height of elements with 'answer-content-container' class
        var answerElements = document.querySelectorAll('.answer-content-container');
        answerElements.forEach(function(element) {
            element.style.height = 'auto';
        });

        // Remove div elements with 'access-expert-holder' class
        var expertElements = document.querySelectorAll('div.access-expert-holder');
        expertElements.forEach(function(element) {
            element.remove();
        });

        // Remove div elements with 'col-md-3 col-12 read-btn-container' class
        var readBtnElements = document.querySelectorAll('div.col-md-3.col-12.read-btn-container');
        readBtnElements.forEach(function(element) {
            element.remove();
        });

        console.log(`Content adjusted. Run count: ${runCount + 1}`);
    }

    function executeScript() {
        if (runCount < 5) {
            adjustContent();
            runCount++;
            setTimeout(executeScript, 2000); // Schedule next execution
        }
    }

    // Detect URL changes (Single Page Application support)
    let lastUrl = window.location.href;
    setInterval(() => {
        if (lastUrl !== window.location.href) {
            lastUrl = window.location.href;
            runCount = 0; // Reset the run count for new pages
            executeScript(); // Restart script on URL change
        }
    }, 1000);

    // Start script on page load
    executeScript();
})();


// (function() {
//   let runCount = 0;

//   function adjustContent() {
//       // Adjust height of elements with 'answer-content-container' class
//       var answerElements = document.querySelectorAll('.answer-content-container');
//       answerElements.forEach(function(element) {
//           element.style.height = 'auto';
//       });

//       // Remove div elements with 'access-expert-holder' class
//       var expertElements = document.querySelectorAll('div.access-expert-holder');
//       expertElements.forEach(function(element) {
//           element.remove();
//       });

//       console.log(`Height adjusted and "access-expert-holder" divs removed. Run count: ${runCount + 1}`);
//   }

//   function executeScript() {
//       if (runCount < 5) {
//           adjustContent();
//           runCount++;
//           setTimeout(executeScript, 2000); // Schedule next execution
//       }
//   }

//   // Detect URL changes (Single Page Application support)
//   let lastUrl = window.location.href;
//   setInterval(() => {
//       if (lastUrl !== window.location.href) {
//           lastUrl = window.location.href;
//           runCount = 0; // Reset the run count for new pages
//           executeScript(); // Restart script on URL change
//       }
//   }, 1000);

//   // Start script on page load
//   executeScript();
// })();
