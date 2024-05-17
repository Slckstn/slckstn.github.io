$(document).ready(function() {
    // Attach a click event handler to each link in the sidebar
    $("#nav_list a").on("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Get the title attribute of the clicked link to build the JSON filename
        const jsonFileName = $(this).attr("title") + ".json";

        // Use AJAX to fetch the corresponding JSON file
        $.ajax({
            url: "json_files/" + jsonFileName,
            dataType: "json",
            success: function(data) {
                // Clear the existing content in the main element
                $("main").empty();

                // Build the new content using the data from the JSON file
                const content = `
                    <h1>${data.speakers[0].title}</h1>
                    <img src="/${data.speakers[0].image}" alt="${data.speakers[0].speaker}">
                    <h2>${data.speakers[0].month}<br>${data.speakers[0].speaker}</h2>
                    <p>${data.speakers[0].text}</p>
                `;

                // Append the new content to the main element
                $("main").html(content);
            },
            error: function() {
                // Display an error message in case of failure
                $("main").html("<p>Error: Could not load data.</p>");
            }
        });
    });
}); // end document ready
