const countryName = new URLSearchParams(location.search).get("name");
const countryDetails = document.querySelector('.country_details');
const countryNametitle = document.querySelector('.country_details h1');
const flagImg = document.querySelector('.country_details img');
const nativeName = document.querySelector('.native_name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub_region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top_level_domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border_countries');
const backButton = document.querySelector('.back_button');
const themeChanger = document.querySelector('.theme_changer');


// console.log(nativeName.innerText);
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data[0]);
    const country = data[0];

    flagImg.src = country.flags.svg;
    countryNametitle.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else{
      nativeName.innerText = country.name.common;
    }

    population.innerText = country.population.toLocaleString('en-In');

    region.innerText = country.region;
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }
    topLevelDomain.innerText = country.tld.join(', ');

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies).map((currency) =>
      currency.name).join(', ');
    }
   if (country.languages) {
     languages.innerText =  Object.values(country.languages).join(', ');
   }
    
   if (country.borders) {
    country.borders.forEach((border) => {
      // console.log(border);
      fetch(`https://restcountries.com/v3.1/alpha/${border}
      `).then((res)=> res.json())
      .then((data)=>{
        const bordercountriesData = data[0];
        // console.log(bordercountriesData);
        const borderCountryTag = document.createElement('a');
        borderCountryTag.innerText = bordercountriesData.name.common;
        borderCountryTag.href = `country.html?name=${bordercountriesData.name.common}`
        // console.log(borderCountryTag);
        borderCountries.append(borderCountryTag)
      })
    });
   }
  });

  backButton.addEventListener("click",()=>{
    history.back();
  })


let currMode = 'lightMode';
themeChanger.addEventListener('click',()=>{
  if (currMode === 'lightMode') {
    currMode = 'darkMode';
    themeChanger.innerHTML = `
 <p class="theme_changer"><i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode</p>`
    document.body.classList.add('dark');
  }else{
    currMode = 'lightMode';
    themeChanger.innerHTML = ` <p class="theme_changer"><i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode</p>`
    document.body.classList.remove('dark');
  }
  console.log(currMode);
})