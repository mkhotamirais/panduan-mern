const badRequest = (res, message) => res.status(400).json({ message });
const notFound = (res, message) => res.status(404).json({ message });
const internalServerError = (res, message) => res.status(500).json({ message });

const ok = (res, message, data) => res.status(200).json({ message, data });
const created = (res, message, data) => res.status(201).json({ message, data });

module.exports = { badRequest, notFound, internalServerError, ok, created };
