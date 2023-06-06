<template>
    <div class="container">
      <h1>Country</h1>
      <form @submit.prevent="searchCountries">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Cari negara..."
          class="search-input"
          @input="performSearch"
        >
      </form>
      <div class="reference-container" v-if="searchTerm.length > 0">
        <ul>
          <li v-for="result in searchResults.slice(0, 8)" :key="result.name.common" @click="getCountryDetails(result)">
            <router-link :to="getCountryLink(result)" class="country-link">{{ result.name.common }}</router-link>
          </li>
        </ul>
      </div>
      <div v-if="!searchResults.length && searchPerformed" class="alert">
        Data tidak ditemukan.
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchTerm: '',
        searchResults: [],
        searchPerformed: false,
      };
    },
    methods: {
      searchCountries() {
        if (this.searchTerm === '') {
          this.searchResults = [];
          return;
        }
  
        axios
          .get(`https://restcountries.com/v3.1/name/${this.searchTerm}`)
          .then((response) => {
            this.searchResults = response.data;
            this.searchPerformed = true;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      performSearch() {
        if (this.searchTerm === '') {
          this.searchResults = [];
          return;
        }
  
        axios
          .get(`https://restcountries.com/v3.1/name/${this.searchTerm}`)
          .then((response) => {
            this.searchResults = response.data;
            this.searchPerformed = true;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getCountryDetails(country) {
        axios
          .get(`https://restcountries.com/v3.1/name/${country.name.common}`)
          .then((response) => {
            const countryId = response.data[0].cca2;
            this.$router.push({ name: 'desc-country', params: { country: countryId } });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getCountryLink(country) {
        return {
          name: 'desc-country',
          params: {
            country: country.cca2,
          },
        };
      },
    },
  };
  </script>
  

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  line-height: 86px;
  text-align: center;
  color: #000000;
  margin: 0;
  margin-bottom: 20px;
}

form {
  text-align: center;
  margin-bottom: 20px;
}

input {
  box-sizing: border-box;
  width: 700px;
  height: 60px;
  padding: 10px;
  border: 0.5px solid #c8c8c8;
  border-radius: 10px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  text-decoration: underline;
}

.reference-container {
  width: 700px;
  background: #ffffff;
  box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.02), 4px 4px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  overflow-y: auto;
  padding: 10px;
  cursor: pointer;
}

.country-link:hover {
  color: #ff0000;
}

.alert {
  text-align: center;
  color: #f00;
  margin-top: 10px;
}
</style>
