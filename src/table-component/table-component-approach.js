var Table = function(domElement){
	
	this.addHeaders = function(labels){
		if (labels) {
			this.tableHeaders = [];
			var tableHead = this.currentTable.tHead;
			// Empty the Table Head.
			tableHead.innerHTML = '';
			var totalLength = labels.length;
			for (var index = 0; index < totalLength; index ++) {
				var thElement = document.createElement('th');
				thElement.innerHTML = labels[index];
				this.tableHeaders.push(labels[index].toLowerCase());
				// Append the TH Element after the THead.
				tableHead.append(thElement);
			}
		}
	}
	
	this.renderBodyInTheTable = function(data){
		if (data) {
			// Empty the current body.
			this.currentTable.tBodies[0].innerHTML = '';
			var totalLength = data.length;
			for (var index = 0; index < totalLength; index ++) {
					var tableRow = document.createElement('tr');
					var dataRow = data[index];
					var headLength = this.tableHeaders.length;
					for (var innerIndex = 0; innerIndex < headLength; innerIndex ++) {
						var tdElement = document.createElement('td');
						console.log('The Data, Header Length and final value is ', dataRow, this.tableHeaders[innerIndex], dataRow[headLength[innerIndex]]);
						var value = dataRow[this.tableHeaders[innerIndex]];
						tdElement.innerHTML = value ? value : '--';
						tableRow.append(tdElement);
					}
					// Lets iterate over the headers and append the data in the table.
					this.currentTable.tBodies[0].append(tableRow);
			}
		}
	}

	// The Methods to exclude the MSISDNs from the table being shown.
	this.addMsisdnToExclude = function(msisdns){
		
	}
	
	var currentDOMElement = domElement;
  var apiToCall = 'https://www.google.com';
  this.currentTable = document.createElement('table');
	// Create Head and Body.
	this.currentTable.createTHead();
	this.currentTable.createTBody();
	// This function call will add the initial headers to the table.
	this.tableHeaders = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
	this.addHeaders(this.tableHeaders);
	domElement.append(this.currentTable);
	this.callMe = function() {
		console.log('Call Me Table ', this.currentTable);
	}
}
