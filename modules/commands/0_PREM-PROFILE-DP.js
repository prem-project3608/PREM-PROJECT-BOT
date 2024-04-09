module.exports = {
    name: 'profile',
    aliases: ['pfp'],
    description: 'Get the profile picture of a user',
    execute(client, message, args) {
        // Check if a user is mentioned
        if (!message.mentions.users.size) {
            return message.reply('You must tag the person you want to get the profile picture of');
        }

        // Get the mentioned user's ID
        const userID = message.mentions.users.first().id;

        // Get the mentioned user's profile picture URL
        const avatarURL = message.client.users.cache.get(userID).displayAvatarURL({ dynamic: true });

        // Reply with the profile picture
        message.reply({
            body: 'Here is the profile picture:',
            attachment: avatarURL
        });
    },
};
