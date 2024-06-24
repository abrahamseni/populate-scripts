import fetch from "node-fetch";
import { API_VERSION, BASE_URL, BEARER_TOKEN } from "./base.js";
import { checks } from "./data.js";

function timeout(wait = 1000, message) {
  return new Promise((resolve) =>
    resolve(
      setTimeout(() => {
        console.log("waited", message);
      }, wait)
    )
  );
}

function createBody(check) {
  //! always change the body logic here
  // patch status
  // const body = [
  //   {
  //     path: "checklistVariants",
  //     value: ["standard"],
  //     op: "add",
  //   },
  // ];

  const { metadata } = check;
  const lettings = metadata?.lettings;

  const body = {
    status: "completed",
    metadata: {
      ...metadata,
      lettings: {
        ...lettings,
        majorIncidentNote: "Included in Bulk Update",
        hasChangedByUser: true,
      },
    },
  };

  return body;
}

async function patchStatusAndMetadata({ method, url, token, data }) {
  if (!token) {
    throw new Error("Please copy your token.");
  }

  for (let i = 0; i < data.length; i++) {
    //! always check the body before you run it!
    const check = data[i];
    if (check.status === "notNeeded" || check.status === "completed") {
      continue;
    }
    // console.log("body", createBody(check));
    //! check the body before you run this!
    try {
      await fetch(url(check.id), {
        method,
        body: JSON.stringify(createBody(check)),
        headers: {
          Authorization: `Bearer ${token}`,
          "api-version": API_VERSION,
          "if-match": check._eTag,
        },
      });
    } catch (error) {
      console.log(error);
      break;
    }
    await timeout(600, check.id);
  }
}

patchStatusAndMetadata({
  method: "patch",
  url: (checkId) => `${BASE_URL}/tenancies/ELL240030/checks/${checkId}`,
  token: BEARER_TOKEN,
  data: checks,
});
