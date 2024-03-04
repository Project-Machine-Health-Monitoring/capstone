const exportCSV = (data) => {

    // Convert data to CSV format
    const csvContent = data.map(row => Object.values(row).join(",")).join("\n");
  
    // Create Blob representing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  
    // Create URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
  
    // Simulate click on the link to trigger download
    link.click();
  
    // Clean up: revoke URL
    URL.revokeObjectURL(url);
  };
  
  export default exportCSV;  