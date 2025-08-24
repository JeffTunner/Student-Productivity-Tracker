function detectIntent(text) {
  const t = text.toLowerCase();
  if (/(mood|feeling)/.test(t)) return "mood";
  if (/(journal|diary|reflect)/.test(t)) return "journal";
  if (/(task|todo|plan)/.test(t)) return "tasks";
  if (/(summarize|summary)/.test(t)) return "summarize";
  if (/(help|how.*use|feature)/.test(t)) return "help";
  return "chat";
}

function violatesGuardrails(text) {
  const t = text.toLowerCase();
  if (/(diagnose|prescribe|investment advice|legal advice)/.test(t)) return true;
  return false;
}

export async function mockRespond({ systemPrompt, messages, tools }) {
  const user = messages[messages.length - 1]?.content ?? "";

  return new Promise((resolve) => {
    setTimeout(() => {
      if (violatesGuardrails(user)) {
        resolve(
          "Sorry — I can’t help with that. I can assist with planning, study, journaling, and your tasks instead."
        );
        return;
      }

      const intent = detectIntent(user);
      const today = tools.getToday();
      const mood = tools.getMood(today);
      const journal = tools.getJournal(today);
      const tasks = tools.getPlannedTasks(today);

      switch (intent) {
        case "mood":
          resolve([
            `**Mood check for ${today}**`,
            `- Logged mood: ${mood ?? "not set yet"}`,
            `- Tip: add one line about *why* it feels ${mood ?? "like this"} today.`,
            `**Next:** Type: "Set mood to 8" (mock for now).`
          ].join("\n"));
          break;

        case "journal":
          resolve([
            `**Today’s journal**`,
            journal ? `- ${journal}` : "- No entry yet.",
            `**Next:** Try “Summarize my journal” or “Draft 3 reflection bullets.”`
          ].join("\n"));
          break;

        case "tasks":
          resolve([
            `**Planned tasks for ${today}**`,
            tasks && tasks.length ? tasks.map(t => `- ${t}`).join("\n") : "- No tasks logged.",
            `**Next:** “Help me prioritize top 2.”`
          ].join("\n"));
          break;

        case "summarize":
          resolve([
            `**Quick summary**`,
            `- Mood: ${mood ?? "unknown"}`,
            `- Journal: ${journal ? journal.slice(0, 140) + (journal.length > 140 ? "…" : "") : "none"}`,
            `- Tasks: ${tasks && tasks.length ? tasks.slice(0, 3).join(", ") : "none"}`
          ].join("\n"));
          break;

        case "help":
          resolve([
            `**What I can do**`,
            `- Read today’s mood, journal, and tasks (read-only).`,
            `- Summarize, suggest next steps, plan small sprints.`,
            `**Try:** "Plan my next 45 minutes using my tasks."`
          ].join("\n"));
          break;

        default:
          resolve(`Got it. Do you want me to use today's mood/journal/tasks to help? Try: "summarize today".`);
      }
    }, 1500);
  });
}
