//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//DOM Elements:

document.querySelector('button').addEventListener('click', getFetch)
let search = document.querySelector('input')
let h2 = document.querySelector('h2')
let img = document.querySelector('img')
// let h3 = document.querySelector('h3')
let next = document.querySelector('.next')
let previous = document.querySelector('.previous')
// document.querySelector('.next').addEventListener('click', nextOne)
// document.querySelector('.previous').addEventListener('click', previousOne)

let sunflowerArray = []

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

// sunflowerFetch()



function getFetch(){
  sunflowerFetch()
  let objectKey = random(0, sunflowerArray.objectIDs.length-1)
  let objectValue = sunflowerArray.objectIDs[`${objectKey}`]
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectValue}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        if (data.primaryImage) {
            img.src = data.primaryImage
        } else {
          getFetch()
        }
      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}



//////****  With Next & Previous Buttons   *******///////
// fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//        // console.log(data.drinks)

//         let i = 0;
//         function display() {
//           h2.innerText = 
//           img.src = 
//         }

//         if(data.drinks.length === 1) {
//           display(0)
//         } 
        
//         else {
//           next.style.visibility = 'visible';
//           previous.style.visibility = 'visible'
//           document.querySelector('.next').addEventListener('click', nextOne)
//           document.querySelector('.previous').addEventListener('click', previousOne)
          
//           display(0)
          
//           function nextOne() {
//             i += 1;
//             // i = Math.min(i++, data.drinks.length-1)
//             display(i)
//           }
          
//           function previousOne() {
//             i--;
//             i = Math.max(i--, 0)
//             display(i)
//           }        
//         }
//       })

//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }