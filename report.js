function downloadReport() {
  const duration = Math.floor((Date.now() - startTime) / 1000);
  const report = {
    "Candidate Name": "John Doe",
    "Interview Duration": `${Math.floor(duration / 60)}m ${duration % 60}s`,
    "Focus Lost": focusLostCount,
    "Suspicious Events": suspiciousEvents,
    "Final Integrity Score": Math.max(100 - (focusLostCount * 2 + suspiciousEvents.length * 3), 0)
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'proctoring_report.json';
  a.click();
}
