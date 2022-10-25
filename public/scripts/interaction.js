
function createInteraction(fields) {
    fetch('/api/interaction', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}

function deleteInteraction(fields) {
  fetch(`/api/interaction/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function editInteraction(fields) {
  fetch(`/api/interaction/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function viewInteractionsByFreetId(fields) {
  fetch(`/api/interaction?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewAllInteractions(fields) {
  fetch('/api/interaction')
    .then(showResponse)
    .catch(showResponse);
}

