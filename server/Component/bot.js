const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const markdownIt = require("markdown-it");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const md = markdownIt();

const collectMessages = async (req, res, next) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // console.log(text);

    var htmlContent = md.render(text);
    htmlContent = htmlContent.replace(/(?:\r\n|\r|\n)/g, "");
    res.status(200).json({
      message: "Messages processed successfully!",
      htmlContent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing messages", error: error.message });
  }
};

module.exports = { collectMessages };

// for multi-turn conversation :

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();
// const markdownIt = require("markdown-it");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const md = markdownIt();

// // Function to get the initial chat history
// function getInitialChatHistory() {
//   return [
//     {
//       role: "user",
//       parts: [
//         {
//           text: "you are a chat bot of a website called 'Wealth-View' where user can ask \
//           you about financial plannning related stuff and you need to \
//           answer that. any question other than those related to financial planning \
//           should not be assisted and the reply should be : sorry, i am a financial planner ai , please only ask related stuff",
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [{ text: "OK , I'll follow this instructions." }],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: "Answer all the user questions and if you don't know answers say : sorry, i am a \
//           financial planner ai , please only ask related stuff but do not ever send an empty reply ,  do answer all the questions.",
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: "Ok , i will answer every user questions.",
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `follow this links to get idea about financial knowledge : \
//           ${getUrls()}`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: "ok , i will access these links to gain information based on user queries.",
//         },
//       ],
//     },
//   ];
// }

// const collectMessages = async (req, res, next) => {
//   const { prompt } = req.body;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const chat = model.startChat({
//       history: getInitialChatHistory(),
//       generationConfig: {
//         maxOutputTokens: 100,
//       },
//     });

//     const result = await chat.sendMessage(prompt);
//     if (!result) {
//       throw new Error("Failed to send message");
//     }
//     const response = result.response;
//     const text = response.text();
//     console.log(text);

//     res.status(200).json({ message: "Messages processed successfully!", text });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error processing messages", error: error.message });
//   }
// };

// // getting articles urls from database :
// const UrlModel = require("../Model/UrlModel");
// const urls = [];
// const getUrls = async () => {
//   const links = await UrlModel.find();
//   for (let i = 0; i < links.length; i++) {
//     urls.push(links[i].url);
//   }
//   return urls;
// };

// module.exports = { collectMessages };
