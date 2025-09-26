const app = require("./server");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// 0.0.0.0 allows connections from emulators and other devices on the same network.
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running at http://localhost:${PORT} and all interfaces`);
// });
