class EmailService {
    update(data) {
        console.log(`EmailService: Sending email notification with data: ${JSON.stringify(data)}`);
    }
}

module.exports = EmailService;
