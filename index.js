import fetch from "node-fetch";
// import { checksId } from "./savillsId.js";
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

async function createMetadata({ method, url, token, data, createBody }) {
  for (let i = 0; i < data.length; i++) {
    //! always check the body before you run it!
    // console.log("body", createBody(data[i]));

    try {
      await fetch(`https://platform.reapit.cloud${url}`, {
        method,
        body: JSON.stringify(createBody(data[i])),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json-patch+json",
          "api-version": "2020-01-31",
        },
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
  createBody,
});
