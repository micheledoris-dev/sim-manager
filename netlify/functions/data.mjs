import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore({ name: "simdata", consistency: "strong" });
  const method = req.method;
  if (method === "GET") {
    const people = await store.get("people", { type: "json" }) || [];
    const sims = await store.get("sims", { type: "json" }) || [];
    return Response.json({ people, sims });
  }
  if (method === "POST") {
    const { people, sims } = await req.json();
    if (people !== undefined) await store.setJSON("people", people);
    if (sims !== undefined) await store.setJSON("sims", sims);
    return Response.json({ ok: true });
  }
  return Response.json({ error: "Metodo non supportato" }, { status: 405 });
};

export const config = { path: "/api/data" };
