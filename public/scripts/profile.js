

function createProfile(fields) {
    fetch('/api/profile', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}

function deleteProfile(fields) {
  fetch('/api/profile', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function changeBio(fields) {
  fetch('/api/profile', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changePic(fields) {
  fetch('/api/profile', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}
