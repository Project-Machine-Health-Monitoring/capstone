import supabase from "../database/supabase";

const showSettingsPopup = () => {
    // Create a pop-up window
    const settingsWindow = window.open('', '_blank', 'width=500,height=280');

    // Write HTML content to the pop-up window
    settingsWindow.document.write(
        `
        <html>
        <head>
            <title>Settings</title>
        </head>
        <body>
            <h1>Settings</h1>
            <form id="settingsForm">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email"><br><br>
                <button type="button" id="sendButton">Send</button>
            </form>
        </body>
        </html>
        `
    );

    // Attach event listener to the send button
    const sendButton = settingsWindow.document.getElementById('sendButton');
    sendButton.addEventListener('click', () => {
        const emailInput = settingsWindow.document.getElementById('email').value;
        updateSettings(emailInput);
    });
};

const updateSettings = async (email) => {
    try {
        // Update the 'Settings' table in Supabase with the new email
        const { data, error } = await supabase
            .from('Settings')
            .upsert([{ email }], { onConflict: ['email'] });

        if (error) {
            throw error;
        }

        console.log('Settings updated:', data);
    } catch (error) {
        console.error('Error updating settings:', error.message);
    }
};

export { showSettingsPopup, updateSettings };