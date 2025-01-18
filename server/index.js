const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV === "production" ? "live" : "locally";

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT} (${environment})`);
});
