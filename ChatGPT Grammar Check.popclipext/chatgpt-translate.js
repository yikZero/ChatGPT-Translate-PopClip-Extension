"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const translateText = async (input, options) => {
  const openai = axios_1.default.create({
    baseURL: "https://api.yikzero.net/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prefix = "请将以下内容翻译成中文，如果内容本身是中文则翻译成英文，仅需输出翻译后的结果，如果翻译内容本身有符号，输出相对应的符号，如果没有符号禁止自行添加符号:\n\n";
  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prefix + input.text }],
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
};
// export the actions
exports.actions = [{
  title: "ChatGPT: Translate",
  code: translateText,
}];
