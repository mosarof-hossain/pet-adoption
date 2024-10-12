let allSortedPets=[];
//show all pets
const fetchAllpets = () => {
  // Fetch Data
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) =>{
      allSortedPets=data.pets;
      displayAllpets(allSortedPets);
    })
    .catch((error) => console.log(error));
};

// fetch category wise data
const fetchCategory = () => {
    // Fetch Data
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((response) => response.json())
      .then((data) => displayAllCategory(data.categories))
      .catch((error) => console.log(error));
  };
  
  const displayAllCategory = (allData) => {
    const allCatagory = document.getElementById('category');
    allData.forEach((allData) => {
      const categoryBtn = document.createElement("button");
      categoryBtn.classList = "flex items-center gap-x-4 lg:gap-x-10 gap-y-3 lg:gap-y-0 px-10 lg:px-28 py-2 border rounded-xl category-btn";
      categoryBtn.innerHTML = `
                <img src="${allData.category_icon}">
                <p class="text-lg lg:text-2xl font-extrabold">${allData.category}</p>
          `;
        categoryBtn.onclick=() =>{
            const allBtn=document.querySelectorAll(".category-btn");
            allBtn.forEach((btn) => btn.classList.remove("bg-[#0E7A81]", "text-white"));
            categoryBtn.classList.add("bg-[#0E7A81]" ,"text-white");
            categoryWiseData(allData.category);
        };
        allCatagory.append(categoryBtn);
    })};

// show categoryWise data
const categoryWiseData=(category) =>{
    const allpets=document.getElementById("allpets");
    const spinner=document.getElementById("loadSpinner");
    if(!spinner){
      console.log("Sppiner not found");
        return;
    }
    allpets.innerHTML="";
    spinner.classList.remove("hidden");
    const timeout=setTimeout(() =>{
      spinner.classList.add("hidden flex justify-center items-center");
    },7000);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((response) => response.json())
    .then((dataJson) => {
      clearTimeout(timeout);
      displayAllpets(dataJson.data);
      spinner.classList.add("hidden");
    })
    .catch((error) => console.log(error));
}

// liked pets show inside all pets
const addLikedPets= (petImg) => {
    const likedPets=document.getElementById('likedPets');
    const likeImg=document.createElement("img");
    likeImg.classList="rounded-xl p-2 object-cover";
    likeImg.src=petImg;
    likedPets.appendChild(likeImg);
};

// open Modal for adopts button
const openAdoptsModal=() =>{
  const modal=document.getElementById('adoptModal');
  const countDown=document.getElementById('countDownTime');
  let countDownTime=3;
  countDown.innerText=countDownTime;
  modal.classList.remove('hidden');
  clearInterval(window.countDownStart);
 window.countDownStart=setInterval(() =>{
    countDownTime--;
    countDown.innerText=countDownTime;

    if(countDownTime<1){
      clearInterval(window.countDownStart);
      modal.classList.add('hidden');
    }
  }, 1000);
};

//Fetch pet details
const fetchDetailsPet=(petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayDetailsPet(data.petData);
  })
  .catch(error => {
    console.log(error);
  })
};

// Display pet details
const displayDetailsPet=(petDetails) => {
  const petName=petDetails.pet_name? petDetails.pet_name: "Not available";
  const detailsP=petDetails.pet_details? petDetails.pet_details : "Not available";
  const breed=petDetails.breed?petDetails.breed: "Not available";
  const birthDay=petDetails.date_of_birth?petDetails.date_of_birth: "Not available";
  const gender=petDetails.gender? petDetails.gender: "Not available";
  const vaccinated_status=petDetails.vaccinated_status? petDetails.vaccinated_status: "Not available";
  const price=petDetails.price? petDetails.price: "Not available";
  const detailsPet=document.getElementById("petDetails");
  detailsPet.innerHTML=`
      <div id="detailsModal" class="modal modal-open" role="dialog">
        <div class="modal-box flex flex-col">
          <img src="${petDetails.image}" class="rounded-2xl"/>
              <div>
                    <h2 class="card-title text-2xl font-bold">${petName}</h2>
                    <div class="grid grid-cols-2">
                      <p><i class="fa-solid fa-list"></i> Breed: ${breed}</p>
                      <p><i class="fa-solid fa-list"></i> Breed: ${vaccinated_status}</p>
                      <p><i class="fa-solid fa-venus"></i> Gender: ${gender}</p>
                      <p><i class="fas fa-calendar"></i> Birth: ${birthDay}</p>
                      <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price}</p>
                    </div>
              </div>
              <div>
                <h1 class="card-title">Details Information</h1>
                <p class="">${detailsP}</p>
              </div>
          <div class="modal-action flex justify-center items-center">
            <button onclick="closeModal()" class="btn w-full">Cancel</button>
          </div>
        </div>
      </div>
  `
window.closeModal = () => {
    document.getElementById("detailsModal").classList.remove("modal-open");
    document.getElementById("detailsPet").innerHTML="";
  }
};
// Display all pets
const displayAllpets = (pets) => {
  const allPets = document.getElementById("allpets");
  allPets.innerHTML="";
  if(pets.length==0){
    allPets.innerHTML=`
    <div class="col-span-3 flex flex-col items-center gap-y-10 px-36 py-10 bg-gray-300">
        <img src="assets/images/error.webp" />
         <h1 class="text-2xl font-bold">No Information Available<h1/>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
         </p>
    
    </div>
    `;
  }
  pets.forEach((pets) => {
    const petName=pets.pet_name? pets.pet_name: "Not available";
    const breed=pets.breed?pets.breed: "Not available";
    const birthDay=pets.date_of_birth?pets.date_of_birth: "Not available";
    const gender=pets.gender? pets.gender: "Not available";
    const price=pets.price? pets.price: "Not available";
    const petsCard = document.createElement("div");
    petsCard.classList = "card card-compact bg-base-100 border";
    petsCard.innerHTML = `
         <figure class="p-4">
            <img src="${pets.image}" class="rounded-xl" />
        </figure>
        <div class="card-body items-start">
            <h2 class="card-title text-2xl font-bold">${petName}</h2>
            <p><i class="fa-solid fa-list"></i> Breed: ${breed}</p>
            <p><i class="fas fa-calendar"></i> Birth: ${birthDay}</p>
            <p><i class="fa-solid fa-venus"></i> Gender: ${gender}</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price}</p>
            <div class="card-actions justify-around gap-x-3">
            <button class="px-5 py-2 rounded-lg border like-btn"><i class="fa-regular fa-thumbs-up text-lg"></i></button>
            <button class="px-5 rounded-lg py-2 border text-lg font-bold text-teal-600 adopts-btn">Adopts</button>
            <button class="px-5 rounded-lg py-2 border text-lg font-bold text-teal-600 detailsBtn">Details</button>
            </div>
        </div>
        `;
        // Event listener for like button
        petsCard.querySelector(".like-btn").addEventListener("click", () =>{
            addLikedPets(pets.image);
        });

        // Event listener for adopts button
        petsCard.querySelector(".adopts-btn").addEventListener("click", ()=>{
          openAdoptsModal();
        });
        // Event listener for details button
        petsCard.querySelector(".detailsBtn").addEventListener("click", () => {
            fetchDetailsPet(pets.petId);
        });
    allPets.append(petsCard);
  });
};

// Event listener for sorted pets
document.getElementById('sortedPets').addEventListener("click", ()=> {
  const sortedPets= [...allSortedPets].sort((a,b) =>  a.price -b.price);
  displayAllpets(sortedPets);
})
// call all function
fetchCategory();
fetchAllpets();
