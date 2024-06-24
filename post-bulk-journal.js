import fetch from "node-fetch";
import { API_VERSION, BASE_URL, BEARER_TOKEN } from "./base.js";
import { tenancies } from "./tenancies.js";

function timeout(wait = 1000, message) {
  return new Promise((resolve) =>
    resolve(
      setTimeout(() => {
        console.log("success", message || "ok");
      }, wait)
    )
  );
}

function createBody() {
  //! always change the body logic here
  const bulkEntries = tenancies.map((tenancy) => {
    return {
      typeId: "MI",
      propertyId: tenancy.propertyId,
      associatedType: "tenancy",
      associatedId: tenancy.id,
      description: "Checklist statuses have been bulk updated to 'Completed'",
      negotiatorId: tenancy.negotiatorId,
    };
  });

  const body = {
    createJournalEntry: bulkEntries,
  };

  return body;
}

async function patchStatusAndMetadata({ method, url, token }) {
  if (!token) {
    throw new Error("Please copy your token.");
  }

  //! always check the body before you run it!
  console.log("body", createBody());

  //! check the body before you run this!
  // try {
  //   await fetch(url(), {
  //     method,
  //     body: JSON.stringify(createBody()),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "api-version": API_VERSION,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   break;
  // }
  // await timeout(600);
  // }
}

patchStatusAndMetadata({
  method: "post",
  url: () => `${BASE_URL}/journalEntries/bulk`,
  token: BEARER_TOKEN,
  // data: tenancies,
});
