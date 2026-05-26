const Groq =
  require("groq-sdk");

const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY,
});

exports.askAI = async (
  req,
  res
) => {
  try {
    const { message } =
      req.body;

    const chat =
      await groq.chat.completions.create(
        {
          messages: [
            {
              role: "system",
              content:
                "You are a smart shopping assistant.",
            },

            {
              role: "user",
              content: message,
            },
          ],

         model: "llama-3.3-70b-versatile",
        }
      );

    res.json({
      reply:
        chat.choices[0]
          .message.content,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "AI Error",
    });
  }
};