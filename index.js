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

function createBody(data) {
  //! always change the body logic here
  // patch status
  // const body = [
  //   {
  //     path: "checklistVariants",
  //     value: ["standard"],
  //     op: "add",
  //   },
  // ];

  const { entityType, entityId, metadata } = data;

  const body = {
    entityType,
    entityId,
    metadata,
  };

  return body;
}

async function patchStatusAndMetadata({ method, url, token, data }) {
  if (!token) {
    throw new Error("Please copy your token.");
  }

  for (let i = 0; i < data.length; i++) {
    //! always check the body before you run it!
    console.log("body", createBody(data[i]));
    //! check the body before you run this!
    // try {
    //   await fetch(url(data[i].id), {
    //     method,
    //     body: JSON.stringify(createBody(data[i])),
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "api-version": API_VERSION,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   break;
    // }
    // await timeout(600, data[i].id);
  }
}

patchStatusAndMetadata({
  method: "patch",
  url: (checkId) => `${BASE_URL}/tenancies/ELL240030/checks/${checkId}`,
  token: BEARER_TOKEN,
  data: checks,
});
