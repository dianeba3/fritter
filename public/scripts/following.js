function createFollowing(fields) {
    fetch('/api/following', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}

function deleteFollowing(fields) {
  fetch(`/api/following/${fields.following}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewAllFollowing(fields) {
  fetch('/api/following/following')
    .then(showResponse)
    .catch(showResponse);
}

function viewAllFollowers(fields) {
  fetch('/api/following/followers')
    .then(showResponse)
    .catch(showResponse);
}