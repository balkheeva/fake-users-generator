export function post(url, data = {}) {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json', Authorization: localStorage.getItem("token")}
    })
        .then(data.json())
}

export function get(url) {
    return fetch(url, {headers: {Authorization: localStorage.getItem("token")}})
        .then(handleResponse)
}

function handleResponse(response) {
    if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.replace(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
    }
    else if (!response.ok) return response.text().then(t => Promise.reject(t))
    return response.json()
}