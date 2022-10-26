function createFollowerBarrier(fields) {
    fetch('/api/followerBarrier', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}

function changePasscode(fields) {
    fetch('/api/followerBarrier', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

function deleteFollowerBarrier(fields) {
    fetch('/api/followerBarrier', {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }