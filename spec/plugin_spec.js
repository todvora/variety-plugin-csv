var plugin = require('../index');

// results of every analysis will be delivered in similar format
var mockedResults = [
  {
    "_id": {
      "key": "_id"
    },
    "value": {
      "types": [
        "ObjectId"
      ]
    },
    "totalOccurrences": 5,
    "percentContaining": 100
  },
  {
    "_id": {
      "key": "pets"
    },
    "value": {
      "types": [
        "Array",
        "String"
      ]
    },
    "totalOccurrences": 2,
    "percentContaining": 40
  }
];

describe('CSV plugin for Variety', function() {

//	beforeEach(function(){
//		plugin.init({'delimiter' : '|'});
//	});

  it('should format results to CSV', function() {
    // let our plugin transform the variety results into own representation
    var output = plugin.formatResults(mockedResults);

    // verify, that plugin transformed data to expected format
    // https://jasmine.github.io/1.3/introduction.html#section-Expectations
    expect(output).toEqual(
      'key|types|occurrences|percents' + '\n' +
        '_id|ObjectId|5|100' + '\n' +
        'pets|Array,String|2|40'
    );
  });

  it('should handle delimiter passed through the plugin config', function() {

    plugin.init({'delimiter': ';'});

    // let our plugin transform the variety results into own representation
    var output = plugin.formatResults(mockedResults);

    // verify, that plugin transformed data to expected format
    // https://jasmine.github.io/1.3/introduction.html#section-Expectations
    expect(output).toEqual(
      'key;types;occurrences;percents' + '\n' +
        '_id;ObjectId;5;100' + '\n' +
        'pets;Array,String;2;40'
    );
  });
});