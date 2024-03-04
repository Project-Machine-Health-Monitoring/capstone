const exportImage = (canvasId, fileName) => {
    const canvas = document.getElementById(canvasId);

    // Check if canvas element exists
    if (!canvas) {
        console.error(`Canvas element with id '${canvasId}' not found.`);
        return;
    }

    // Get Blob representing the image data
    canvas.toBlob(blob => {
        // Create URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'graph.png'; // Default filename is 'graph.png'

        // Simulate click on the link to trigger download
        link.click();

        // Clean up: revoke URL
        URL.revokeObjectURL(url);
    });
};

export default exportImage;