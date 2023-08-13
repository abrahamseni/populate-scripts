import fetch from "node-fetch";
import { API_VERSION, BASE_URL } from "./base.js";
import { currentChecks } from "./currentChecks.js";

function timeout(wait = 1000, message) {
  return new Promise((resolve) =>
    resolve(
      setTimeout(() => {
        console.log("waited", message);
      }, wait)
    )
  );
}

function createHeaders(token) {
  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "api-version": API_VERSION,
  };
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

async function createMetadata({ method, url, token, data }) {
  if (!token) {
    throw new Error("Please copy your token.");
  }

  for (let i = 0; i < data.length; i++) {
    //! always check the body before you run it!
    console.log("body", createBody(data[i]));
    //! check the body before you run this!
    // try {
    //   await fetch(url, {
    //     method,
    //     body: JSON.stringify(createBody(data[i])),
    //     headers: createHeaders(token),
    //   });
    // } catch (error) {
    //   console.log(error);
    //   break;
    // }
    // await timeout(1000, i);
  }
}

//! Don't forget to add token here
const bearerToken = "testing";

createMetadata({
  method: "post",
  url: `${BASE_URL}/metadata`,
  token: bearerToken,
  data: currentChecks,
});
