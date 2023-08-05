const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
     res.status(200).send("Welcome to Code converter Application🙏");
});

app.post("/convert", async (req, res) => {
     try {
          const { code, language } = req.body;

          const response = await axios.post(
               "https://api.openai.com/v1/engines/text-davinci-003/completions",
               {
                    prompt: `Convert this ${code} in ${language} language`,
                    max_tokens: 100,
                    temperature: 0.7,
                    n: 1,
               },
               {
                    headers: {
                         Authorization: `Bearer ${process.env.api_key}`,
                         "Content-Type": "application/json",
                    },
               }
          );

          const result = response.data.choices[0].text.trim();
          res.status(200).json({ result });
     } catch (error) {
          console.error("Error:", error.response.data);
          res.status(500).json({ error: "Something went wrong" });
     }
});
app.post("/debug", async (req, res) => {
     try {
          const { code } = req.body;

          const response = await axios.post(
               "https://api.openai.com/v1/engines/text-davinci-003/completions",
               {
                    prompt: `Debug this ${code} `,
                    max_tokens: 100,
                    temperature: 0.7,
                    n: 1,
               },
               {
                    headers: {
                         Authorization: `Bearer ${process.env.api_key}`,
                         "Content-Type": "application/json",
                    },
               }
          );

          const result = response.data.choices[0].text.trim();
          res.status(200).json({ result });
     } catch (error) {
          console.error("Error:", error.response.data);
          res.status(500).json({ error: "Something went wrong" });
     }
});
app.post("/quality", async (req, res) => {
     try {
          const { code } = req.body;

          const response = await axios.post(
               "https://api.openai.com/v1/engines/text-davinci-003/completions",
               {
                    prompt: `Check quality of this ${code} `,
                    max_tokens: 100,
                    temperature: 0.7,
                    n: 1,
               },
               {
                    headers: {
                         Authorization: `Bearer ${process.env.api_key}`,
                         "Content-Type": "application/json",
                    },
               }
          );

          const result = response.data.choices[0].text.trim();
          res.status(200).json({ result });
     } catch (error) {
          console.error("Error:", error.response.data);
          res.status(500).json({ error: "Something went wrong" });
     }
});

app.listen(port, () => {
     console.log(`server is running on port ${port}`);
});
