document.addEventListener('DOMContentLoaded', function() {
    // JSON dosyasından veri çekme
    $.ajax({
        url: '../blog.json',  // JSON dosyasının doğru yolunu kontrol edin
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let routesContainer = document.createElement('div');
            routesContainer.id = 'routes-container';
            
            let wikiContainer = document.createElement('div');
            wikiContainer.id = 'wikipedia-container';
            
            data.routes.forEach(route => {
                let routeDiv = document.createElement('div');
                routeDiv.className = 'route';
                
                let destination = document.createElement('h3');
                destination.textContent = route.city;
                
                let description = document.createElement('p');
                description.textContent = route.description;
                
                routeDiv.appendChild(destination);
                routeDiv.appendChild(description);
                
                routesContainer.appendChild(routeDiv);

                // Wikipedia API'den bilgi çekme
                $.ajax({
                    url: `https://en.wikipedia.org/api/rest_v1/page/summary/${route.city}`,
                    method: 'GET',
                    success: function(wikiData) {
                        let wikiDiv = document.createElement('div');
                        wikiDiv.className = 'wiki-info';
                        
                        let wikiTitle = document.createElement('h3');
                        wikiTitle.textContent = route.city;
                        
                        let wikiContent = document.createElement('p');
                        wikiContent.textContent = wikiData.extract;
                        
                        wikiDiv.appendChild(wikiTitle);
                        wikiDiv.appendChild(wikiContent);
                        
                        wikiContainer.appendChild(wikiDiv);
                    },
                    error: function(error) {
                        console.error(`Error fetching Wikipedia data for ${route.city}:`, error);
                    }
                });
            });
            
            document.querySelector('.blogmain').appendChild(routesContainer);
            document.querySelector('.blogmain').appendChild(wikiContainer);
        },
        error: function(error) {
            console.error('Error fetching the travel routes:', error);
        }
    });
});
