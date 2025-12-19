module.exports.cleanupAndShutdown = (signal, server, db) => {
  server.close(() => {
    console.log(`${signal} signal recieved! Server closed!`);
  });
  db.disconnectDB();
};
