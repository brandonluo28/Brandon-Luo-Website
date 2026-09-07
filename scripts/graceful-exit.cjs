// Vinext's immediate successful exit can race native worker teardown on Windows.
// Let Node drain the event loop on success; errors keep their original exit path.
if (process.platform === 'win32') {
  const exit = process.exit.bind(process);
  process.exit = (code) => {
    if (code === undefined || Number(code) === 0) {
      process.exitCode = 0;
      return;
    }
    return exit(code);
  };
}
