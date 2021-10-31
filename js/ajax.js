const q = fetch(
    'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
).then((response) => {
    console.log(response.json())
})