const puppeteer = require("puppeteer");
const { ApolloError } = require("apollo-server-express");
const UserModel = require("../models/user.model");
//todo - move all selectors to constants dict

module.exports.getCredentials = async function getCredentials(
  context,
  ggEmail,
  ggPassword
) {
  let cred = null;
  if (!ggEmail) {
    const dbUser = await UserModel.getUserByEmail(context.user.email);
    cred = dbUser.ggCredentials;
    // here use dbUser.ggCredentials to scrape the data
  } else {
    if (!ggEmail || !ggPassword) {
      throw new ApolloError("Bad request");
    } else {
      cred = {
        email: ggEmail,
        password: ggPassword,
      };
    }
  }
  if (!cred || !cred.email || !cred.password) {
    throw new ApolloError("no credentials found");
  }
  return cred;
};

async function ggSignIn(page, { email, password }) {
  await page.goto("https://www.geoguessr.com/signin", {
    waitUntil: "networkidle2",
  });

  await page.focus('input[data-qa="email-field"]');
  await page.keyboard.type(email);

  await page.focus('input[data-qa="password-field"]');
  await page.keyboard.type(password);

  page.click("button[type='submit']");
  await page.waitForNavigation();
}

module.exports.getDataFromUrl = async (url, credentials) => {
  const browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await ggSignIn(page, credentials);
  if (!url.includes("http")) {
    url = `https://www.${url}`;
  }
  await page.goto(url);

  await page.waitForSelector(".results-highscore__player-nick");
  const trNamesArray = await page.$$(".results-highscore__player-nick");
  const trScoresArray = await page.$$(
    ".results-highscore__guess-cell--total .results-highscore__guess-cell-score"
  );

  const scores = (
    await Promise.all(
      trScoresArray.map(
        async (tr) => await page.evaluate((tr) => tr.textContent, tr)
      )
    )
  ).map((singleScoreStr) => parseFloat(singleScoreStr.replace(/,|pts| /g, "")));
  const names = await Promise.all(
    trNamesArray.map(
      async (tr) => await page.evaluate((tr) => tr.textContent, tr)
    )
  );
  let scoreDict = {};
  names.forEach((name, index) => {
    scoreDict[name] = scores[index];
  });
  await browser.close();
  return scoreDict;
};
