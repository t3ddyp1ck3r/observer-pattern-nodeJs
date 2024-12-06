class LoggingService {
    update(data) {
        console.log(`LoggingService: Logging data: ${JSON.stringify(data)}`);
    }
}

module.exports = LoggingService;
