export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

    if (!BOT_TOKEN || !CHANNEL_ID) {

        return res.status(500).json({
            success: false,
            message: "Server Configuration Missing"
        });

    }

    return res.status(200).json({

        success: true,

        message: "Secure Upload API Connected Successfully"

    });

}
