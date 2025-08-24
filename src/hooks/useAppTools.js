
export function useAppTools() {
  const getToday = () => new Date().toISOString().slice(0, 10);

  // TODO: replace with real contexts
  const getMood = (dateISO) => 7; // mock
  const getJournal = (dateISO) => "Felt productive but a bit distracted in the afternoon.";
  const getPlannedTasks = (dateISO) => ["Finish AI page", "Review PR #12", "30-min workout"];

  return { getToday, getMood, getJournal, getPlannedTasks };
}
