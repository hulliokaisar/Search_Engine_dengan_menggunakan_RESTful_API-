<template>
  <div>
    <router-link to="/" type="button" class="btn custom_button">
      <span><img src="../assets/icons8-arrow-left-ios-16-glyph-32.png" alt="" /></span> Back to HomePage
    </router-link>

    <p class="custom_p">{{ country?.name?.common }}</p>
    <img
      v-if="country?.flags && country?.flags.png"
      :src="country?.flags.png"
      :alt="country.name.common + ' flag'"
      class="flag"
    />

    <span class="badge rounded-pill custom_span">{{ country?.cca2 }}</span>

    <span class="badge rounded-pill custom_span2">{{
      country?.demonyms?.eng?.f
    }}</span>

    <span class="badge rounded-pill custom_span3">{{ country?.name?.common }}</span>

    <div class="row">
      <div class="col">
        <div class="col">
          <div class="custom_card">
            <div class="card-body">
              <p class="mt-3 custom_text">LatLong</p>
              <h5 class="custom_title">{{ country?.latlng }}</h5>
              <img src="../assets/globe.svg" alt="" class="globe" />
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="custom_card2">
          <div class="card-body">
            <p class="mt-4 custom_details">Capital: <b>{{ country?.capital }}</b></p>
            <p class="custom_details">Region: <b>{{ country?.region }}</b></p>
            <p class="custom_details">Subregion: <b>{{ country?.subregion }}</b></p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p class="card-text custom_card3">Calling</p>
        <h5 class="custom_title2">{{ country?.callingCodes?.[0]?.name }}62</h5>
        <p class="custom_p2">
          <span class="custom_s2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ callingCount }} countries</span>
          with this calling code
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">{{ country?.name?.common }}</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </p>
      </div>
      <div class="col">
        <p class="custom_p3">Currency</p>
        <h5 class="custom_title3">{{ country?.currencies?.[0]?.name }}IDR</h5>
        <p class="custom_p4">
          <span class="custom_s4 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ currencyCount }} countries</span>
          with this currency
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">{{ country?.name?.common }}</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countryName: "",
      country: null,
      callingCount: 0,
      currencyCount: 0,
      loading: false,
      error: false,
      showDropdown: false,
      countriesWithCurrency: [],
    };
  },
  methods: {
    async fetchCountryData() {
      this.loading = true;
      this.error = false;
      this.country = null;
      this.callingCount = 0;
      this.currencyCount = 0;

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${this.countryName}`
        );
        const data = await response.json();
        if (data.length > 0) {
          this.country = data[0];
          if (this.country.callingCodes?.length > 0) {
            const callingCodes = this.country.callingCodes[0].code;
            const callingCountResponse = await fetch(
              `https://restcountries.com/v2/callingcode/${callingCodes}?include=count`
            );
            const callingCountData = await callingCountResponse.json();
            this.callingCount = callingCountData.length;
            this.countriesWithCalling = callingCountData;
          }
          if (this.country.currencies?.length > 0) {
            const currencyCode = this.country.currencies[0].code;
            const currencyCountResponse = await fetch(
              `https://restcountries.com/v2/currency/${currencyCode}?include=count`
            );
            const currencyCountData = await currencyCountResponse.json();
            this.currencyCount = currencyCountData.count;
            this.countriesWithCurrency = currencyCountData;
          }
        } else {
          this.error = true;
        }
      } catch (error) {
        this.error = true;
      }

      this.loading = false;
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
  mounted() {
    this.countryName = this.$route.params.country;
    this.fetchCountryData();
  },
};
</script>


<style>
.btn {
  position: absolute;
  width: 229px;
  height: 50px;
  left: 90px;
  top: 90px;
  border-radius: 10px;
  background-color: #8362F2 !important;
  color: #ffffff !important; /* Mengubah warna teks menjadi putih */
}



.custom_p {
  position: absolute;
  width: 330px;
  height: 57px;
  left: 90px;
  top: 190px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 57px;
  text-align: center;
  color: #000000;
}

.custom_p2 {
  position: absolute;
  width: 300px;
  height: 17px;
  left: 90px;
  top: 574px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.custom_s2 {
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: #8362f2;
}

.custom_p3 {
  position: absolute;
  width: 80px;
  height: 21px;
  left: 655px;
  top: 480px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #000000;
}

.custom_p4 {
  position: absolute;
  width: 200px;
  height: 17px;
  left: 670px;
  top: 574px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.custom_s4 {
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: #8362f2;
}

.flag {
  position: absolute;
  width: 46px;
  height: 30px;
  left: 450px;
  top: 206px;
}

.custom_span {
  position: absolute;
  width: 38px;
  height: 25px;
  left: 90px;
  top: 247px;
  background: #8dd5cc;
  border-radius: 50px;
}

.custom_span2 {
  position: absolute;
  width: 161px;
  height: 25px;
  left: 133px;
  top: 247px;
  background: #8dd5cc;
  border-radius: 50px;
}

.custom_span3 {
  position: absolute;
  width: 145px;
  height: 25px;
  left: 299px;
  top: 247px;
  background: #8dd5cc;
  border-radius: 50px;
}

.custom_card {
  position: absolute;
  width: 540px;
  height: 143px;
  left: 90px;
  top: 297px;
  background: #ffffff;
  box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.02), 4px 4px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  overflow: hidden;
}

.custom_card2 {
  position: absolute;
  width: 540px;
  height: 143px;
  left: 655px;
  top: 297px;
  background: #ffffff;
  box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.02), 4px 4px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
}

.custom_card3 {
  position: absolute;
  width: 111px;
  height: 21px;
  left: 60px;
  top: 480px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #000000;
}

.custom_text {
    width: 71px;
height: 21px;
left: 115px;
top: 322px;
font-family: 'SF Pro Text';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 21px;
text-align: center;
color: #000000;

}

.custom_title {
  width: 300px;
  height: 57px;
  left: 115px;
  top: 354px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 250%;
  line-height: 57px;
  text-align: center;
  color: #8362f2;
}

.custom_title2 {
  position: absolute;
  width: 64px;
  height: 57px;
  left: 90px;
  top: 506px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 57px;
  text-align: center;
  color: #8362f2;
}

.custom_title3 {
  position: absolute;
  width: 85px;
  height: 57px;
  left: 655px;
  top: 506px;
  font-family: "SF Pro Text", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 57px;
  text-align: center;
  color: #8362f2;
}

.globe {
  position: absolute;
  right: 0;
  top: 1.56%;
  bottom: 1.56%;
  width: 40%;
  background: rgba(0, 0, 0, 0.05);
}

.custom_details {
  width: 265px;
  height: 21px;
  left: 682px;
  top: px;

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  text-align: left;

  color: #000000;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.custom_dropdown_toggle {
  cursor: pointer;
}

.dropdown-menu {
  background-color: #333 !important; 
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) !important;
  z-index: 1;
  color: #fff !important; 
}

.dropdown-menu div {
  padding: 5px;
  cursor: pointer;
  color: #fff ; 
}

.country-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

</style>
