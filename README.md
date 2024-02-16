# WhatsApp Bulk Sender

> [!WARNING]
> At the moment, the project doesn't work with no-gui systems.

## Installation instructions

1. Install NodeJs: Ensure you have NodeJs installed on your system. You can download it from [here](https://nodejs.org/en/download).
2. Download the ZIP file: Click the green "Code" button above and select "Download ZIP" to get the repository files.
3. Extract the ZIP file: Once the download is complete, extract the contents of the ZIP file to a directory of your choice.
4. Open a terminal: Open your preferred terminal application (e.g., CMD on Windows, Terminal on macOS/Linux).
5. Navigate to the project directory: Use the `cd` command to navigate into the directory where you extracted the ZIP file.
   
   ```bash
   cd extraction/path/
   ```
6. Install dependencies: Run the following command to install the required dependencies
   
   ```bash
   npm install
   ```
7. Run the application: Start the application by running the following command and follow the on-screen instructions
   
   ```bash
   node .
   ```
   
   ## How do I personalize the message?
   
   To do this, go to `assets/message.txt` and edit the message placeholder.
   The message may contain variables extracted from each line of the message data. These variables can be accessed by indexing them from the message_data.csv file starting from 0 up to the total number of variables present. For a complete understanding, see the placeholder file and its implementation.
   
   ## How do I personalize the numbers and variables?
   
   To do this, go to `assets/message_data.csv` and fill the file with the phone numbers and, if necessary, the variables for each one, separated by semicolons (;). The first word before the number will be the variable with index 0.
