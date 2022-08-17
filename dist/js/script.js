$(document).ready(function (){
    let base_url = 'https://cos-lab.herokuapp.com'

    $("form#analyze").submit(function(e){

        e.preventDefault();
        let data = convertFormToJSON("form#analyze")
        

        loader(true)
        
        // Doing ajax to the server
        var settings = {
            "url": `${base_url}/api/analysis`,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "query": $("input#query").val()
            }),
        };
          
        $.ajax(settings).done(function ({data}) {
            $("#positive").html(data.positive)
            $("#netral").html(data.netral)
            $("#negative").html(data.negative)
            $("#summary").html(data.summary)
            // console.log(data);
            addHit()
            loader(false)
        });
    })

    getHit()

    function loader(cond){
        if(cond){
            $(".loader-div").css("opacity", '1')
            $(".loader-div").removeClass("z-index-lowwer")
        }else{
            $(".loader-div").css("opacity", '0')
            $(".loader-div").addClass("z-index-lowwer")
        }
    }

    function convertFormToJSON(form) {
        const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
        const json = {};
        $.each(array, function () {
          json[this.name] = this.value || "";
        });
        return json;
      }

    function getUser() {
      // doing ajax to the server, to save uniqe user
      var settings = {
        "url": `${base_url}/api/user`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        $("#user_counter").html(response.size)
      });
    }

    function getHit() {
      var settings = {
        "url": `${base_url}/api/hit`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        $("#hit_counter").html(response.data)
      });
    }
    
    function addHit() {
        var settings = {
          "url": `${base_url}/api/hit`,
          "method": "POST",
          "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
          $("#hit_counter").html(response.data)
        });
    }
})