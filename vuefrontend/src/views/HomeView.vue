<template>
  <main>
    <h1>HHHJJ</h1>
    <p>State: {{ connected }}</p>
    <p>fooEvents: {{ fooEvents }}</p>
  </main>
</template>

<script>
import { io } from "socket.io-client";

export default {
  name: "HomeView",
  data() {
    return {
      socket: null,
      connected: false,
      value: "",
      isLoading: false,
      fooEvents: []
    };
  },
  methods: {
    // You can define methods here if needed
  },
  created() {
    // Connect to the Socket.IO server
    this.socket = io("http://localhost:5000", {
  transports: ['websocket'],
});


    // Listen for the 'connect' event to confirm connection
    this.socket.on("connect", () => {
      console.log("Connected!")
      this.connected = true;
    });

    // Listen for the 'disconnect' event to handle disconnection
    this.socket.on("disconnect", () => {
      console.log("Disconnected!")
      this.connected = false;
    });

    // Listen for the 'databaseChange' event emitted from the server
    this.socket.on("databaseChange", (data) => {
      console.log("Received databaseChange event:", data);
      // Push received data to fooEvents array to display in the template
      this.fooEvents.push(data);
    });
  },
  mounted() {
    // Additional mounted logic if needed
  }
};
</script>
