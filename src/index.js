var uuid = require('node-uuid');


// Add object as a star of nodes, with name in the center, and name/prop1 around
module.exports.objectToPath = function(obj, name, separator) {
  var actualseparator;
  if (separator === undefined) {
    actualseparator = "/";
  } else {
    actualseparator = separator;
  }
  if (obj === Object(obj)) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsPath(obj[prop], name + actualseparator + prop,actualseparator), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes with UUID names except for the leaves
Hexastore.prototype.addJSObjectAsUUID = function(obj) {
  if (obj === Object(obj)) {
    var name = uuid.v4();
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsUUID(obj[prop]), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes with JSON names except for the leaves
Hexastore.prototype.addJSObjectAsJSON = function(obj) {
  if (obj === Object(obj)) {
    var name = JSON.stringify(obj);
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this.put([name, prop, this.addJSObjectAsJSON(obj[prop]), true]);
      }
    }
    return name;
  } else if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
};

// Add object as a star of nodes, using UUID by default
Hexastore.prototype.addJSObject = Hexastore.prototype.addJSObjectAsUUID;

// Add object as a star of nodes with JSON names except for the leaves
Hexastore.prototype.getJSObject = function(name) {
  //TODO
  var res = this.querySXX([name,null,null]);
  var obj = {};
  for(var i=0;i<res.length;i++){
    obj[res[1]]=this.getJSObject(res[2]);
  }
  return obj;
};
