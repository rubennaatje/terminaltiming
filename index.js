var blessed = require("blessed");
var contrib = require("blessed-contrib");
var { red, white, blue, bold } = require("kleur");
var screen = blessed.screen();
var rp = require("request-promise");
var jsonparser = require("./jsonparser");

var grid = new contrib.grid({rows: 20, cols: 12, screen: screen})

var tableIsInFront = true;
var table = grid.set(1, 0, 19, 12, contrib.table, 
    { keys: true
    , fg: 'ffff00'
    , label: 'Timing'
    , columnSpacing: 2
    , columnWidth: [3, 3,     6,      9,      6,    27,     21,     29,  3 ,   8,   8,   8,     10,       10,          10,      10,         5]});
var headers = ['POS', '#', 'STATE','CLASS', 'PIC' ,'TEAM','DRIVER','CAR','T','LAP','GAP','INT','SECTOR 1','SECTOR 2','SECTOR 3','LAST LAP','PIT'];

var boxOptions = {
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: ' ',
  tags: true,
  align: 'center',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'green',
  }
};

var box = grid.set(0,0,1,12, blessed.box, boxOptions);

var log = grid.set(1, 11, 5, 1, contrib.log,
  { fg: "green"
  , selectedFg: "blue"
  , label: 'Server Log'})

 var log = grid.set(1, 11, 5, 1, contrib.log,
  { fg: "green"
  , selectedFg: "blue"
  , label: 'Server Log'})


function getData(){
  const options = {
    uri: 'https://storage.googleapis.com/fiawec-prod/assets/live/WEC/__data.json?_='+epoch,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (data) {
      log.log('update succesful');
      updateData(data);

  })
  .catch(function (err) {
      log.log('error', err);
  });
}

function updateData(data){
  table.setData({headers: headers, data: jsonparser.JSONtoTableArray(data.entries)});
  box.setContent(timeConvert(data.params.remaining)+'\n'
  + data.params.eventName);
}

function timeConvert(n) {
  return new Date(n * 1000).toISOString().substr(11, 8);
}

function setListeners(){
  screen.key(['escape'], function(ch, key) {
    return process.exit(0);
  });

  table.setFront();
  screen.key('enter', function(ch, key) {
    if(tableIsInFront){
      table.setBack();
      tableIsInFront = false;
    } else {
      table.setFront();
      tableIsInFront = true;
    }
  });
}

main();

function main(){
  var epoch = (new Date).getTime();
  setInterval(function() {   
    epoch = epoch + 3000;
  }, 1000)

  setInterval(function() {
    getData();
  }, 5000);

  setInterval(function() {   
    screen.render()
  }, 100);

  getData();
}
