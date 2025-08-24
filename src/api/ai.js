export function getAiResponses(userMessage) {

    if(userMessage.toLowerCase().includes("hello")) {
        return "Hey Abhi 👋, how’s your day going?";
    }

    if (userMessage.toLowerCase().includes("mood")) {
        return "Hmm, I think you should also update your mood tracker today 😊";
    }

    if (userMessage.toLowerCase().includes("task")) {
        return "Don’t forget to check your tasks in the daily view ✅";
    }

    if (userMessage.toLowerCase().includes("journal")) {
        return "Want me to open your journal entry for today?";
    }

    return "I’m here with you 💡 — tell me what’s on your mind.";
}

export async function sendToAPI(userMessage) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const reply = getAiResponses(userMessage);
                resolve(reply)
            }, 1200);
        });
    }