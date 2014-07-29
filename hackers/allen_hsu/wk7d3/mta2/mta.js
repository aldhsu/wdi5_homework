$(document).ready(function(){
var lines = {
  N: ['N_Times_Square','N_34th','N_28th','N_23rd','Union_Square','N8th'],
  L: ['L8th','L_6th','Union_Square','L_3rd','L_1st'],
  L6: ['Grand_Central','L6_33rd','L6_28th','L6_23rd','Union_Square','L6_Astor_Place'],
  Seven: ['Seven_Queensboro_Plaza', 'Seven_Court_Sq', 'Seven_Hunters_Point_Avenue', 'Seven_Vernon_Boulevard','Grand_Central']
};

var $startline = $('#start-line');
var $stopline = $('#stop-line');
var $startstation = $('#start-station');
var $stopstation = $('#stop-station');

function intersection_destructive(a, b)
{
  a = a.slice();
  b = b.slice();
  var result = new Array();
  while( a.length > 0 && b.length > 0 ) {
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else {
       result.push(a.shift());
       b.shift();
     }
  }
  return result;
}


var stops_on_journey = function (start_index, stop_index, line_and_station, hash) {
  var stops = [];
  var number_of_stops = (start_index-stop_index);
  if (start_index < stop_index) {
    return hash[line_and_station.line].slice(start_index, stop_index + 1)
  } else if (start_index > stop_index) {
    return hash[line_and_station.line].slice(stop_index, start_index + 1).reverse();
  } else {
    return [];
  }
}
// #stops list returns [stops] or [stops, common]
var stops_list = function(hash, start_station, end_station) {
  var stops =[];
  var start_index = hash[start_station.line].indexOf(start_station.station);
  var end_index = hash[end_station.line].indexOf(end_station.station);

  if (start_station.line == end_station.line) {
    return stops_on_journey(start_index,end_index,start_station,hash);
  } else {
    // 1 change journey get index of common,start and end produce journey with single line
    var common = intersection_destructive(hash[start_station.line],hash[end_station.line]);
    var start_common_index = hash[start_station.line].indexOf(common[0]);
    var end_common_index = hash[end_station.line].indexOf(common[0]);
    var start_to_common = stops_on_journey(start_index,start_common_index, start_station, hash);
    var end_to_common = stops_on_journey(end_index,end_common_index, end_station, hash);
    stops =(start_to_common.concat(end_to_common.reverse()));
    console.log();
    return stops;
  }
}


var startStation = 0;
var endStation = 0;



$(document).on('change',function() {

  var getStations = function(line, dropdown) {
    var stations = lines[line];
    for (var index in stations) {
      var station = stations[index];
      var option = $('<option>').attr("value",station).text(station);
      dropdown.append(option);
    }
  }

  // Populate
  var lineDropdowns = [$startline, $stopline];
  var stationDropdowns = [$startstation, $stopstation];
  for (var index in stationDropdowns) {
    var dropdown = stationDropdowns[index];
    var line = lineDropdowns[index].val();
    getStations(line, dropdown);
  }

  var startStation = {
    line: $('#start-line').val(),
    station: $('#start-station').val()
  };
  var endStation = {
      line: $('#stop-line').val(),
      station: $('#stop-station').val()
  };
  console.log(stops_list(lines, startStation, endStation));
});

  dropDown = [$startline, $stopline];
  for (var index in dropDown){
    var currentDD = dropDown[index]
    for (var line in lines) {
      var option = $('<option>').attr("value",line).text(line);
      currentDD.append(option);
    }
  }
})
