module.exports.cleanupAndShutdown = (signal, server, db, scheduledTask) => {
  server.close(() => {
    console.log(
      `[${new Date().toISOString()}] ${signal} signal recieved! Server closed!`
    );
  });

  scheduledTask.off("execution:failed", () => {});
  console.log(
    `[${new Date().toISOString()}] Removed task event listener 'execution:failed'`
  );
  scheduledTask.stop();
  scheduledTask.destroy();
  console.log(`[${new Date().toISOString()}] Scheduled task destroyed!`);

  db.disconnectDB();

  const forceShutdown = setTimeout(() => {
    console.log(`[${new Date().toISOString()}] Process exited forcefully`);
    process.exit(1);
  }, 5000);
  clearTimeout(forceShutdown);
  process.exit(0);
};
