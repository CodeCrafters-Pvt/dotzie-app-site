import fs from "node:fs/promises";
import QRCode from "qrcode";
// Placeholder destinations requested for the prelaunch design.
await fs.mkdir(new URL("../public/qr/", import.meta.url), { recursive: true });
for (const [name, url] of [
  ["app-store", "https://apps.apple.com/app/dotzie"],
  ["google-play", "https://play.google.com/store/apps/details?id=app.dotzie"],
]) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 4,
    color: { dark: "#111111", light: "#ffffff" },
  });
  await fs.writeFile(new URL(`../public/qr/${name}.svg`, import.meta.url), svg);
}
