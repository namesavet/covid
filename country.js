$(function(){
    
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('country'));

    var country = urlParams.get('country');
    $("#country").html(country);

    var url = "https://pomber.github.io/covid19/timeseries.json";

    $.getJSON(url, function (result) {

        var selectedCountry = result[country];
        console.log(selectedCountry);

        for(var i=selectedCountry.length-1;i>=0;i--){
           
            var row = `<tr>
            <th scope="row">${selectedCountry[i].date}</th>
            <td>${selectedCountry[i].confirmed}</td>
            <td>${selectedCountry[i].deaths}</td>
            <td>${selectedCountry[i].recovered}</td>
          </tr>`

          $("#data").append(row);

        }
        

        var nowConfirmed = selectedCountry[(selectedCountry.length) - 1].confirmed;
        var nowDeaths = selectedCountry[(selectedCountry.length) - 1].deaths;
        var nowRecovered = selectedCountry[(selectedCountry.length) - 1].recovered;
        $("#nowConfirmed").append(nowConfirmed);
        $("#nowDeaths").append(nowDeaths);
        $("#nowRecovered").append(nowRecovered);
       
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Confirmed", "Deaths", "Recovered"],
                    datasets: [{
                        label: '# of count',
                        data: [nowConfirmed,nowDeaths,nowRecovered],
                        backgroundColor: [
                            
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                           
                        ],
                        borderColor: [
                            
                            'rgba(54, 162, 235, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(255, 206, 86, 1)',
                            
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
            
        
    });



})