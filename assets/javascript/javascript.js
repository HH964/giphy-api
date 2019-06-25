var topics = ["Toyota","Porsche","BMW","Rolls Royce","Aston Martin","McLaren","Lamborghini","Lexus","Nissan","Mercedes Benz"];

      function displayCar() {

        var car = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=ezMnHKSFFs4U8kLi7B08wLgCvit2m1gV&limit=10";
        console.log(queryURL)
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        // $("#carGifGalore").text(JSON.stringify(response));
      
        var results = response.data;
          console.log(results)//nothing happens again

          for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                    var carImage = $("<img>");
            
            carImage.attr("src", results[i].images.fixed_height_still.url);
            carImage.attr("data-still", results[i].images.fixed_height_still.url);
            carImage.attr("data-animate", results[i].images.fixed_height.url);
            carImage.attr("data-state", "still");
            carImage.addClass("carloope");
            
            carDiv.append(p);
            carDiv.append(carImage);

            $("#carGifGalore").prepend(carDiv);
          }

          $(".carloope").on("click", function(){
              var state = $(this).attr("data-state");
              if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } 
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
          })
      
      
      });
      }
      

      function renderButtons() {

        $("#buttonLocal").empty();

        for (var i = 0; i < topics.length; i++) {
          var carblah = $("<button>");
          carblah.addClass("vroom");
          carblah.attr("data-name", topics[i]);
          carblah.text(topics[i]);
          $("#buttonLocal").append(carblah);
        }
      }


      $("#addCar").on("click", function(event) {
        event.preventDefault();

        var car = $("#carInput").val().trim();
        
        topics.push(car);
        console.log(topics);

        renderButtons();
      });

      $(document).on("click", ".vroom", displayCar);
      renderButtons();