import fetch from "node-fetch";
import { API_VERSION, BASE_URL } from "./base.js";
import { rnChecks } from "./rnChecks.js";

const bearerToken = "";

function timeout(wait = 1000) {
  return new Promise((resolve) =>
    resolve(
      setTimeout(() => {
        console.log("waited");
      }, wait)
    )
  );
}

function createHeaders(token) {
  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json-patch+json",
    "api-version": API_VERSION,
  };
}

function createBody(data) {
  // TODO: always change the body logic here
  // const body = [
  //   {
  //     value: data.attachmentNeeded ? "optional" : "disabled",
  //     path: "attachmentNeeded",
  //     op: "add",
  //   },
  // ];

  const body = {
    entityType: "temptenancyrenewalcheck",
    metadata: data,
  };

  return body;
}

async function createMetadata({ method, url, token, data }) {
  // TODO: make it run in parallel ?
  // or not, because we hit the same endpoint
  for (let i = 0; i < data.length; i++) {
    //! always check the body before you run it!
    // console.log("body", createBody(data[i]));

    try {
      await fetch(`${BASE_URL}${url}`, {
        method,
        body: JSON.stringify(createBody(data[i])),
        headers: createHeaders(token),
      });
    } catch (error) {
      console.log(error);
      break;
    }
    await timeout(1000);
  }
}

createMetadata({
  method: "post",
  data: rnChecks,
  url: "/metadata",
  token: bearerToken,
});
