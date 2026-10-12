export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({ status: "OK", message: "Pages Functions backend running" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
