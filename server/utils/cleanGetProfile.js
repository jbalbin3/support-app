
function cleanGetProfile(queryResultArray, cb) {
  const cleanProfileObject = queryResultArray[0];
  const distinctAddictions = new Set();
  const distinctConnections = new Set();
  queryResultArray.forEach((row) => {
    distinctAddictions.add(row.available_addictions);
    distinctConnections.add(row.available_connections);
  });
  const availableAddictions = [...distinctAddictions];
  const availableConnections = [...distinctConnections];
  cleanProfileObject.available_addictions = availableAddictions;
  cleanProfileObject.available_connections = availableConnections;
  const addictions = {};
  const connections = {};
  availableAddictions.forEach((addiction) => {
    addictions[addiction] = false;
  });
  availableConnections.forEach((connection) => {
    connections[connection] = false;
  });
  for (let i = 0; i < queryResultArray.length; i++) {
    const row = queryResultArray[i];
    addictions[row.addiction_type] = true;
    connections[row.connection_type] = true;
  }
  cleanProfileObject.addictions = addictions;
  cleanProfileObject.connections = connections;
  cb(cleanProfileObject);
}

module.exports.cleanGetProfile = cleanGetProfile;
