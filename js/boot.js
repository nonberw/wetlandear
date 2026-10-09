/* Hides the page for a moment so the chosen language never flashes. Safety timeout included.
   Kept as a file (not inline) so the Content-Security-Policy can forbid inline scripts. */
(function () {
  var d = document.documentElement;
  setTimeout(function () { d.classList.remove('i18n-pending'); }, 1500);
})();
