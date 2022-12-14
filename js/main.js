//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//DOM Elements:

document.querySelector('.search').addEventListener('click', getFetch)
document.querySelector('.random').addEventListener('click', getRandomImage)
let search = document.querySelector('input')
let artist = document.querySelector('.artist')
let title = document.querySelector('.title')
let year = document.querySelector('.year')
let img = document.querySelector('img')
// let h3 = document.querySelector('h3')
let next = document.querySelector('.next')
let previous = document.querySelector('.previous')
// document.querySelector('.next').addEventListener('click', nextOne)
// document.querySelector('.previous').addEventListener('click', previousOne)

let sunflowerArray = []
let total = []
let randomID = 0
let totalArray = []
let imageArray = []


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}


function sunflowerFetch(){
  const choice = document.querySelector('input').value
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=`+choice
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        sunflowerArray = data
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
sunflowerFetch()



function getFetch(){
  sunflowerFetch()
  let objectKey = random(0, sunflowerArray.objectIDs.length-1)
  let objectValue = sunflowerArray.objectIDs[`${objectKey}`]
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectValue}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        //console.log(data)
        if (data.primaryImage) {
            img.src = data.primaryImage
            artist.innerText = `${data.artistDisplayName}`
            title.innerText = `${data.title}`
            year.innerText = `${data.objectDate}`
        } else {
          getFetch()
        } 
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}


function getRandomID() {
  let value = random(0, 483095)
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        total = data
        //console.log(total.objectIDs.length)
        // console.log(total)
        // console.log(total.objectIDs[value])
        randomID = total.objectIDs[value]
        // console.log(randomID)
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}


function getRandomImage(){
  getRandomID()
  const choice = document.querySelector('input').value
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}` 

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        // console.log(data)

        if (data.primaryImage) {
          img.src = data.primaryImage
          artist.innerText = `${data.artistDisplayName}`
          title.innerText = `${data.title}`
          year.innerText = `${data.objectDate}`
      } else {
        getRandomImage()
      }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


////////  Experimenting on Filtering Image Results ///////////
// function imageFilter() {
//   const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`

//   fetch(url)
//       .then(response => response.json()) // parse response as JSON
//       .then(data => {

//         let invalidEntries = 0;

//         console.log(data)
//         totalArray = data.objectIDs[0]
//         console.log(totalArray)

//         function hasImage(item) {
//           if (totalArray.objectIDs[value].primaryImage) {
//             return true
//           } else {
//             invalidEntries++
//             return false
//           }
//         }

//         imageArray = totalArray.filter(hasImage)
//         console.log(imageArray.objectIDs.length)

//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
//   }