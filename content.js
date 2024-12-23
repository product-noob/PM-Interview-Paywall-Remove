(function() {
    let runCount = 0;
    let currentURL = window.location.href;

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

    function deleteAllCookies() {
        // Get all cookies for the current site
        const cookies = document.cookie.split(";");

        // Loop through each cookie and delete it
        cookies.forEach(cookie => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        });

        console.log("All cookies for this site have been deleted.");
    }

    function handlePageChange() {
        const newURL = window.location.href;
        if (newURL !== currentURL) {
            currentURL = newURL; // Update the current URL
            deleteAllCookies();
            location.reload(); // Refresh the page
        }
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

    // Listen for link clicks
    document.addEventListener("click", event => {
        const target = event.target;
        if (target.tagName === "A" && target.href) {
            event.preventDefault(); // Prevent default link behavior
            const newURL = target.href;
            if (newURL !== currentURL) {
                currentURL = newURL; // Update the current URL
                deleteAllCookies();
                window.location.href = newURL; // Navigate to the new URL
            }
        }
    });

    // Check for page refresh or navigation
    window.addEventListener("beforeunload", deleteAllCookies);

    // Initial check
    handlePageChange();

    // Start script on page load
    executeScript();
})();