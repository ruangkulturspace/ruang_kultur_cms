export async function handler(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "get site matchmaking success",
      data: {
        values: res.data.values,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return res.status(400).json({
    success: false,
    message: "get site matchmaking ",
  });
}
