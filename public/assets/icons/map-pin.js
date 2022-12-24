const pinIcon =
  "data:image/png;base64,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";

export { pinIcon };
