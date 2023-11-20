$(document).ready(function () {
    var slideIndex = 0;

    function showSlides() {
      var slides = $(".mySlides");
      $(".mySlides").hide();
      slides.eq(slideIndex).show();
    }

    function plusSlides(n) {
      slideIndex = (slideIndex + n + $(".mySlides").length) % $(".mySlides").length;
      showSlides();
    }

    // Previous button click event
    $("#prevSlide").on("click", function () {
      plusSlides(-1);
    });

    // Next button click event
    $("#nextSlide").on("click", function () {
      plusSlides(1);
    });

    // Close button click event
    $("#closeModal").on("click", function () {
      closeModal();
    });
    

    // Function to open modal
    function openModal() {
      $("#myModal").show();
    }

    // Function to close modal
    function closeModal() {
      $("#myModal").hide();
    }



    // AJAX request to fetch images from Unsplash API
    $.ajax({
      method: "GET",
      url: "https://api.unsplash.com/photos/?client_id=hxB0tgGi4HpwbGzyzlBbPF1ldE1QU05_CGH-ZX6am0E&per_page=50",
      success: function (data) {
        console.log(data);

        data.forEach((photo, index) => {
          $("#gallery_row").append(
            `
            <div class="column">
              <img src="${photo.urls.regular}" class="gallery-img" id="${index}">
              <div class="sponser_profile">
                 <div class="sponser_profilebox">
                 <img src="${photo.user.profile_image.small}" alt="${photo.alt_description}" >
                 <div class="sponser_profiledetails">
              <a href="${photo.user.portfolio_url}" target="_blank">${photo.user.name}</a><br>
              ${
                photo.sponsorship
                  ? `<a href="${photo.sponsorship.tagline_url}" target="_blank">${photo.sponsorship.tagline}</a>`
                  : ''
              }
              </div>
                 </div>
              </div>
            </div>
            `
          );

          // Add modal content for each image
          $("#modal_content").append(
            `
            
            <div class="mySlides">
            <div class="sponser_profile">
            <div class="sponser_profilebox">
            <img src="${photo.user.profile_image.small}" alt="${photo.alt_description}">
            <div class="sponser_profiledetails">
              <a href="${photo.user.portfolio_url}" target="_blank">${photo.user.name}</a><br>
              ${
                photo.sponsorship
                  ? `<a href="${photo.sponsorship.tagline_url}" target="_blank">${photo.sponsorship.tagline}</a>`
                  : ''
              }
              </div>
              
            </div>

          
         </div>



              <img src="${photo.urls.regular}" />


              <div class="additional-content">
                  <!-- Add more data for each slide here -->
                  ${
                    photo.description
                      ? `<p>Description: ${photo.description}</p>`
                      : `<p>Description: Description Not Available</p>`
                  }
                  
                  <p>Location: ${photo.user.location}</p>
                  <!-- Add any other information you want to display -->
                </div>


            </div>
            `
          );
        });

        // After adding gallery images, update the click event handler
        $(".gallery-img").on("click", function () {
          slideIndex = parseInt($(this).attr("id"));
          openModal();
          showSlides();
        });
        
      },
    });
  });