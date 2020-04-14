const create = async (task, credentials) => {
  try {
    let response = await fetch('/api/tasks/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    });
      return await response.json();
    } catch(err) { 
      console.log(err);
    }
};

const list = async (credentials, signal) => {
  try {
    let response = await fetch('/api/tasks/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
      return await response.json();
    } catch(err) { 
      console.log(err);
    }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/tasks/' + params.taskId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
      return await response.json();
    } catch(err) { 
      console.log(err);
  }
};

const update = async (params, credentials, task) => {
  try {
    let response = await fetch('/api/tasks/' + params.taskId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    });
      return await response.json();
    } catch(err) { 
      console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/tasks/' + params.taskId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

export { 
  create, 
  list, 
  read, 
  update, 
  remove 
};