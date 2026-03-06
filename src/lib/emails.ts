const APPS_SCRIPT_URL = "https://script.google.com/macros/s/REDACTED/exec";

export async function addEmail(email: string): Promise<"added" | "duplicate" | "error"> {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ email }),
    });

    const data = JSON.parse(await res.text());
    if (!data.success) return "error";
    return data.duplicate ? "duplicate" : "added";
  } catch {
    return "error";
  }
}
