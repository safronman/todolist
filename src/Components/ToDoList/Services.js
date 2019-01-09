let apiUrl = 'https://repetitora.net/api/JS/Tasks';

let headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'accept': 'application/json'
};

let corsMode = 'cors';

function requestData(url, method, body) {

    return fetch(url, {
        method: method,
        body: body,
        headers: headers,
        mode: corsMode

    })
        .then(result => result.json())
}

// POST
export function createTask(title, widgetId) {

    let data = new URLSearchParams();
    data.append('widgetId', widgetId);
    data.append('title', title);

    return requestData(apiUrl, 'POST', data)
}

// PUT
export function updateTask(title, widgetId, taskId, isDone) {

    let data = new URLSearchParams();
    data.append('title', title);
    data.append('widgetId', widgetId);
    data.append('taskId', taskId);
    data.append('done', isDone);

    return requestData(apiUrl, 'PUT', data)
}

// GET
export function getTask(widgetId) {
    return requestData(`${apiUrl}?widgetId=${widgetId}&count=30`, 'GET', null)
}