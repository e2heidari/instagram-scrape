import puppeteer from "puppeteer";

export const inst = async (id) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`https://www.instagram.com/${id}/`);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  //   await page.type(".devsite-search-field", "automate beyond recorder");

  await page.waitForNetworkIdle();

  //   const folowersData = await page.$$eval("._ac2a", (element) =>
  //     element.map((e) => e.textContent)
  //   );
  //   // Print the full title
  //   console.log("Posts:", folowersData[0]);
  //   console.log("Flowers:", folowersData[1]);
  //   console.log("Folowing:", folowersData[2]);

  const filteredPosts = await page.$$eval("*", (elements) =>
    elements
      .filter(
        (element) =>
          element.tagName === "LI" &&
          element.innerText &&
          element.innerText.includes("posts")
      )
      .map((element) => element.innerText)
  );
  console.log(filteredPosts);
  let post = "";
  if (filteredPosts.length > 0) {
    post = filteredPosts[0].replace(" posts", "");
  }
  const filteredFollowers = await page.$$eval("*", (elements) =>
    elements
      .filter(
        (element) =>
          element.tagName === "LI" &&
          element.innerText &&
          element.innerText.includes("followers")
      )
      .map((element) => element.innerText)
  );
  console.log(filteredFollowers);
  let follower = "";
  if (filteredFollowers.length > 0) {
    follower = filteredFollowers[0].replace(" followers", "");
  }
  const image = await page.$eval("[alt='Profile photo']", (element) =>
    element.getAttribute("src")
  );

  await browser.close();

  return { id, follower, post, image };
};
