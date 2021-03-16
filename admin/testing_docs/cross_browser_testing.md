# Browser Diversity Report

## Methods
We conducted cross browser testing by first inputting our files into a browser compatibility tester and checking the results generated. We then performed multiple rounds of manual testing through different browsers.

## Tools
* [PowerMapper](https://www.powermapper.com/)
  - Runs through files and checks for compatibilty and other accessibility errors
* [LambdaTest](https://www.lambdatest.com/)
  - Runs live manual tests through different browsers
* [CrossBrowserTesting](https://crossbrowsertesting.com/)
  - Runs live manual tests through different browsers
  - Note: This tool has the same functionality as LambdaTest, but both were free trials only. Hence having to use a second cross browser tool.

## Results
* Initially there was an issue regarding the `display: flex` and `overflow-y: scroll` attributes for our task list, causing Safari to improperly render the task list. However, this issue has been fixed.
* Through manual testing, we have found that Internet Explorer is not compatible with our application. Because of this reason, we have decided to have our web application **NOT** support Internet Explorer, as it is deprecated and not up to current browser standards.

### Testing Results on Browser Compatibility from PowerMapper
![Browser Compatibility Results](../images/browserCompatibility.png)

### Browsers Used for Manual Testing
![Different Browsers Used for Manual Testing](../images/browserDiversity.png)