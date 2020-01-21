var Table = function(domElement, properties){
	
	this.addHeaders = function(labels){
		if (labels) {
			this.tableHeaders = [];
			var tableHead = this.currentTable.tHead;
			// Empty the Table Head.
			tableHead.innerHTML = '';
			var totalLength = labels.length;
			if (this.addCheckboxes) {
				var thElementLocal = document.createElement('th');
				thElementLocal.innerHTML = 'Sr. No.';
				tableHead.append(thElementLocal);
			}
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
					if (this.addCheckboxes) {
						var localTdElement = document.createElement('td');
						var checkBox = document.createElement('input');
						checkBox.type = 'checkbox';
						checkBox.name = 'checks';
						localTdElement.append(checkBox);
						tableRow.append(localTdElement);
					}
					for (var innerIndex = 0; innerIndex < headLength ; innerIndex ++) {
						var tdElement = document.createElement('td');
						// console.log('The Data, Header Length and final value is ', dataRow, this.tableHeaders[innerIndex], dataRow[headLength[innerIndex]]);
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
	var localProperties = properties ? properties : {};
  // The Current Table pointer to point to the DOM element.
	this.currentTable = document.createElement('table');
	// The Class Name to add to the table.
	this.currentTable.className = localProperties.className;
	this.addCheckboxes = localProperties.addCheckboxes;
	
	// Create Head and Body.
	this.currentTable.createTHead();
	this.currentTable.createTBody();
	// This function call will add the initial headers to the table.
	this.tableHeaders = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
	this.addHeaders(this.tableHeaders);
	domElement.append(this.currentTable);
	
	// The Data that will be rendered to the table.
	this.data = [];
	
	// The MSISDNS which are meant to be excluded from the list.
	this.excludedMsisdn = [];
	
	this.callMe = function() {
		console.log('Call Me Table ', this.currentTable);
	}
	// This method will set the data and will render all the elements within the same.
	this.setData = function(propData){
		this.data = propData;
		this.renderBodyInTheTable(this.data);
	}
}
