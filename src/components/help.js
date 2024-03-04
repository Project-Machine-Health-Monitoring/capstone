const showHelpPopup = () => {
    // Create a pop-up window
    const helpWindow = window.open('', '_blank', 'width=500,height=200');
  
    // Write HTML content to the pop-up window
    helpWindow.document.write(
        `
            <html>
            <head>
                <title>Help</title>
            </head>
            <body>
                <h1>Help</h1>
                <p><b>Update Graph</b> will fetch the most recent stored data from the database.</p>
                <p><b>Export Graph</b> will download a local copy of the graph PNG format.</p>
                <p><b>Export Data</b> will download a local copy of the fetched data in CSV format.</p>
            </body>
            </html>
        `
    );
  };
  
  export default showHelpPopup;