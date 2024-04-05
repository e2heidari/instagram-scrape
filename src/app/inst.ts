// Import Puppeteer
import puppeteer from "puppeteer";

// Define the inst function to get data for a single Instagram ID
export const inst = async (id: string) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate the page to the Instagram profile URL
    await page.goto(`https://www.instagram.com/${id}/`);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Wait for the network to be idle
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Find elements containing the number of posts, followers, and following
    const [postElement, followerElement, followingElement] = await page.$$eval(
      "span.g47SY",
      (elements) => elements.map((element) => element.textContent)
    );

    // Get the number of posts, followers, and following
    const post = postElement || "0";
    const follower = followerElement || "0";
    const following = followingElement || "0";

    // Get the URL of the profile photo
    const image = await page.$eval('[alt="Profile photo"]', (element) =>
      element.getAttribute("src")
    );

    // Close the browser
    await browser.close();

    // Return the post count, follower count, following count, and profile photo URL
    return { id, post, follower, following, image };
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    // Close the browser in case of error
    await browser.close();
    // Return empty values
    return { id, post: "0", follower: "0", following: "0", image: "" };
  }
};
