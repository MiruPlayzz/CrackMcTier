export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ message: "Skin updated successfully!" });
  }
}
