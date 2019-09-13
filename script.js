let inputs = []; // array that hold all the inputs in the dom
countUrls = 0; // count the urls link that exist in the dom
let container = document.getElementById('indication'); // get the indicate div
let message = document.getElementById('indication__h3'); // get the indicate text
addInputElement(); // initialize the first input

// when user fill all the inputs and send to the backend
sendUrls = () => {
  let countFalseUrls = 0;
  let allUrlsAreValid = true; // that flag  check if all the inputs are valid
  // this loop move over the inputs
  for (let i = 0; i < inputs.length; i++) {
    // check if the input have valid url or if the user fill the the input
    if (!isUrlValid(inputs[i].value.toLowerCase()) || !inputs[i].value) {
      allUrlsAreValid = false;
      makeInputAsError(inputs[i]);
      countFalseUrls++;
    } else {
      makeInputNotError(inputs[i]);
    }
  }

  if (allUrlsAreValid) {
    removeElementsFromDOM('urls', countUrls);
    countUrls = 0;
    saveUrlsInDBAndFetchFromDB(inputs);
    removeElementsFromDOM('inputs-container', inputs.length);
    inputs = [];
    addInputElement();
  } else {
    indicate(
      `Your request has been failed. You have to fix ${countFalseUrls} urls `,
      'red'
    );
    setTimeout(() => (container.style.display = 'none'), 10000);
  }
};
