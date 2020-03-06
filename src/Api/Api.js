export const getAllInterviewEvents = () => {
  return new Promise((resolve, reject) => {
    fetch('/getAllInterviewEvents', { headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(e => reject(e.message))
  })
}
