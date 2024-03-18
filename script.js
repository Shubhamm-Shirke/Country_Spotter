const countries_container = document.querySelector(".countries_container");
const filter = document.querySelector('.filter');
const inputText = document.querySelector('.inputText');
const themeChanger = document.querySelector('.theme_changer');

let allCountryData ;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountryData = data;
  });


  filter.addEventListener('change' ,(e)=>{
  //  console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
  .then((res) => res.json())
  .then((data)=>{
    renderCountries(data);
  }) 
  })

 function renderCountries(data) {
  countries_container.innerHTML = '';
  data.forEach((country) => {
    // console.log(country);
    const contryCard = document.createElement("a");
    contryCard.classList.add("country_card");
    contryCard.href = `country.html?name=${country.name.common}`;
    contryCard.innerHTML = `
    <img src="${country.flags.svg}" 
    alt="${country.name.common}">
    <div class="card_text">
      <h3 class="country_name">${country.name.common}</h3>
      <p><b>Population : </b>${country.population.toLocaleString('en-In')}</p>
      <p><b>Region : </b>${country.region}</p>
      <p><b>Capital : </b>${country.capital?.[0]}</p>
    </div>      
    `;
    countries_container.append(contryCard);
  });
 } 


 inputText.addEventListener('input',(e)=>{
  //  console.log(e.target.value);
  // console.log(allCountryData);
  const tragetCountry =  allCountryData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
  // console.log(tragetCountry);
  renderCountries(tragetCountry);
 })

let currMode = 'lightMode';
themeChanger.addEventListener('click',()=>{
  console.log(themeChanger.innerHTML);
  if (currMode === 'lightMode') {
    currMode = 'darkMode';
    themeChanger.innerHTML = ` <p class="theme_changer"><i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode</p>`
    document.body.classList.add('dark');
  }else{
    currMode = 'lightMode';
    themeChanger.innerHTML = ` <p class="theme_changer"><i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode</p>`
    document.body.classList.remove('dark');
    
  }
  console.log(currMode);
})
















