export default function escapeHtml(text) {
  return text.replace(
    /["&<>]/g,
    (a) => ({
      '"': '&quot;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
    }[a]),
  );
}
