$(document).ready(function() {
    // Attach a click event handler to each link in the sidebar
    $("#nav_list a").click(function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the title attribute of the clicked link to build the JSON filename
        const jsonFile = $(this).attr("title") + ".json";

        // Use AJAX to fetch the corresponding JSON file
        $.getJSON("json_files/" + jsonFile, function(data) {
            // Clear the existing content in the main element
            $("main").empty();
            
            // Build the new content using the data from the JSON file
            const newContent = `
                <h1>${data.title}</h1>
                <img src="/${data.image}" alt="${data.speaker}">
                <h2>${data.month}<br>${data.speaker}</h2>
                <p>${data.text}</p>
            `;

            // Append the new content to the main element
            $("main").html(newContent);
        });
    });
}); // end ready
