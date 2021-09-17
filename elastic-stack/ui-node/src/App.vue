<template>
  <div id="app">
    Elastic Metrics

    <button @click="registerResource()">Register Resource</button>
    <button @click="getAllResources()">Get all Resource</button>

    {{ resources }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return { resources: null };
  },
  methods: {
    registerResource() {
      fetch("http://localhost:3000/register");
    },
    getAllResources() {
      fetch("http://localhost:3000/resource")
        .then(async (response) => await response.json())
        .then((resources) => {
          this.resources = resources;
        });
    },
  },
};
</script>

<style></style>
