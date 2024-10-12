// Load Categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

// Load Pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayByPets(data.pets);
        })
        .catch((error) => console.log(error));
};

// Get Pets 
const getPetsByCategory = async (category) => {
    console.log(category);
    try {
        const result = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await result.json();
        console.log(data.data, "category pets");
        displayByPets(data.data);
    } catch (error) {
        console.error(error);
    }
};

// Display Categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = ''; 

    categories.forEach((item) => {
        const button = document.createElement("button");

        
        let icon = '';
        if (item.category === 'Dog') {
            icon = '<img src="https://img.icons8.com/?size=30&id=llokrmb1fvJE&format=png" alt="dog icon" class="w-10 h-8 " />';
        } else if (item.category === 'Cat') {
            icon = '<img src="https://img.icons8.com/?size=48&id=120341&format=png" alt="cat icon" class="w-10 h-8 mr-" />';
        } else if (item.category === 'Bird') {
            icon = '<img src="https://img.icons8.com/?size=48&id=d3xPwWFYR3xK&format=png" alt="bird icon" class="w-10 h-8 " />';
        } else if (item.category === 'Rabbit') {
            icon = '<img src="https://img.icons8.com/?size=48&id=hopN4KhliyoJ&format=png" alt=rabbit icon" class="w-10 h-8 " />';
        }

        
        button.innerHTML = `${icon} ${item.category}`;
        button.classList = "btn px-9 hover:bg-blue-200 text-2xl shadow-xl m-9 flex items-center";
        
        button.onclick = () => {
            button.innerHTML = `<div class="loader mr-2"></div> Loading...`;

            setTimeout(() => {
                getPetsByCategory(item.category);
                button.innerHTML = `${icon} ${item.category}`;
            }, 2000);
        };
        
        categoryContainer.append(button);
    });
};

const loadDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    console.log(data,'tamim')
    displayDetails(data.petData);
};
const displayDetails = (pet) => {
    
    const detailContainer = document.getElementById("modal-content")
    detailContainer.innerHTML = `
        <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-48 object-cover rounded-lg" />
        <h2 class="text-xl font-bold my-2">${pet.pet_name}</h2>
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Birth Date:</strong> ${pet.date_of_birth}</p>
        <p><strong>Gender:</strong> ${pet.gender}</p>
        
        <p><strong>Price:</strong> ${pet.price}</p>
        <br>
        <h1 class="text-xl font-bold">Details Information</h1>
        <p><strong>Description:</strong> ${pet.pet_details}</p>
    `;
    const modal = document.getElementById("customModal");
    modal.showModal();
  
    
}
const closeModal = () => {
    const modal = document.getElementById("customModal");
    modal.close();
};

// Display Pets 
const displayByPets = (Pets) => {
    const PetsContainer = document.getElementById("Pets");
    PetsContainer.innerHTML = ''; 

    if (Pets.length === 0) {
        PetsContainer.classList.remove("grid");
        PetsContainer.innerHTML = `
        <div class="min-h-[400px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="images/error.webp" />
            <h1 class= "text-2xl font-bold">No Information Available</h1>
            <p>Animals are so innocent that they need lots of love</p>

        </div>
        `;
        return;
    }
    else{
        PetsContainer.classList.add("grid");
    }

    Pets.forEach((Pet) => {
        const card = document.createElement("div");
        card.classList = "card shadow-xl w-11/12 mb-8";
        card.innerHTML = `
            <figure>
                <img src="${Pet.image}" alt="${Pet.pet_name}" class="w-full h-full object-cover rounded-lg"/>
            </figure>
            <div class="ml-8 mt-4 ">
                <h2 class="card-title text-xl font-bold">${Pet.pet_name}</h2>
                <div class="flex items-center text-gray-500 my-2">
                    <img class="w-5 h-5 mr-4" src="https://img.icons8.com/?size=50&id=123398&format=png" alt="breed icon" />
                    <p><strong>Breed:</strong> ${Pet.breed}</p>
                </div>
                <div class="flex items-center text-gray-500 my-2">
                    <img class="w-5 h-5 mr-4" src="https://img.icons8.com/?size=24&id=zYtXkQWxpNz2&format=png" alt="birth icon" />
                    <p><strong>Birth:</strong> ${Pet.date_of_birth}</p>
                </div>
                <div class="flex items-center text-gray-500 my-2">
                    <img class="w-5 h-5 mr-4" src="https://img.icons8.com/?size=24&id=chxI7QFFrLLO&format=png" alt="gender icon" />
                    <p><strong>Gender:</strong> ${Pet.gender}</p>
                </div>
                <div class="flex items-center text-gray-500 my-2">
                    <img class="w-5 h-5 mr-4" src="https://img.icons8.com/?size=16&id=44176&format=png" alt="price icon" />
                    <p><strong>Price:</strong> ${Pet.price}</p>
                </div>
            </div>
            <div class="card-actions flex mr-6 mb-5 mx-auto">
                <div class="flex space-x-4">
                    <img class="w-10 h-8 mr-10 mt-2" src="https://img.icons8.com/?size=48&id=lw3wNzvovclD&format=png" alt="paw icon"/>
                </div>
                <button class="btn text-green-800 font-bold space-y-4">Adopt</button>
                <button onclick="loadDetails('${Pet.petId}')" class="btn text-green-800 font-bold space-x-4">Details</button>
            </div>
        `;
        PetsContainer.append(card);
    });
};

// Initialize
loadCategories();
loadPets();
