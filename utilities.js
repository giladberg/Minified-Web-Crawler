// add a new input element to the dom
let addInputElement = () => {
  let newInput = document.createElement('input');
  newInput.setAttribute('type', 'url');
  newInput.setAttribute('placeholder', 'Please enter url');
  inputs.push(newInput);
  document.querySelector('.inputs-container').appendChild(newInput);
  whenUserPressEnterOnInputField();
};

// when user click enter  on input field
let whenUserPressEnterOnInputField = () => {
  inputs[inputs.length - 1].addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addInputElement();
    }
  });
};

// check if the input is a valid url
let isUrlValid = userInput => {
  let res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (userInput.split(' ').length > 1) res = null;
  if (res == null) return false;
  else return true;
};

let makeInputAsError = input => {
  input.palceholder = 'Please enter a valid url!';
  input.style.color = 'red';
  input.style.borderBottom = '1.2px solid red';
};

let makeInputNotError = input => {
  input.style.color = 'gold';
  input.style.borderBottom = '1.2px solid gold';
};
// this function send all the urls to the server, then retrive all the urls that exsist in the server with appropiate indicate
let saveUrlsInDBAndFetchFromDB = inputs => {
  let i = 1;
  inputs.forEach(input => {
    let obj = JSON.stringify({
      title: domain_from_url(input.value),
      url: input.value
    });

    postRequest(
      'http://localhost/viber-project/server/api/website-url/create.php',
      obj,
      () => {
        if (i == inputs.length) {
          httpGetAsync(
            'http://localhost/viber-project/server/api/website-url/read.php',
            res => {
              if (res == 'failed') {
                indicate(
                  `Some problem with the server. Please try again later`,
                  'red'
                );
                setTimeout(() => (container.style.display = 'none'), 10000);
              } else {
                let urlsLink = JSON.parse(res);
                urlsLink = Object.assign(urlsLink);
                urlsLink.data.forEach(url => {
                  addUrlElement(url.title, url.url);
                  countUrls++;
                });

                indicate(
                  `Your request has been success. You sent ${inputs.length} urls, And retrived from D.B ${urlsLink.data.length} urls.`,
                  'green'
                );
                setTimeout(() => (container.style.display = 'none'), 10000);
              }
            }
          );
        }
        i++;
      }
    );
  });
};

// post request to the rest service
let postRequest = (urls, data, callback) => {
  let http = new XMLHttpRequest();
  let url = urls;
  let params = data;
  http.open('POST', url, true);
  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = () => {
    //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      callback();
    }
  };
  http.send(params);
};

// request to the rest api for fetch data
let httpGetAsync = (theUrl, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
    else callback('failed');
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
};

let addUrlElement = (title, url) => {
  let a = document.createElement('a');
  let linkText = document.createTextNode(title);
  a.appendChild(linkText);
  a.title = title;
  a.href = `https://${url}`;
  a.target = '_blank';
  a.style.display = 'block';
  document.getElementById('urls').appendChild(a);
};

let domain_from_url = url => {
  let domain = url.toLowerCase().split('.');
  if (domain[0] == 'www') {
    return domain[1];
  }
  return domain[0];
};

removeElementFromDOM = id => {
  let list = document.getElementById(id);
  if (list.hasChildNodes()) {
    list.removeChild(list.childNodes[0]);
  }
};

removeElementsFromDOM = (id, numOfElements) => {
  for (let i = 0; i <= numOfElements; i++) {
    removeElementFromDOM(id);
  }
};

indicate = (text, color) => {
  container.style.display = 'block';
  container.style.backgroundColor = color;
  message.style.color = 'white';
  message.innerHTML = text;
};
