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
				var checkBox = document.createElement('input');
				checkBox.type = 'checkbox';
				checkBox.name = 'select-all';
				thElementLocal.append(checkBox);
				this.selectAllCheck = checkBox;
				var currentObject = this;
				checkBox.addEventListener('change', function(){
					console.log('The Select All has been clicked. ', this);
					var childElements = currentObject.getAllCheckboxes();
					var length = childElements.length;
					var isChecked = this.checked;
					for (var index = 0; index < length; index ++) {
						var item = childElements[index];
						item.checked = isChecked;
					}
					var selectedLength = currentObject.getAllSelectedCheckboxes().length;
					currentObject.setCurrentSelectedUsers(selectedLength);
					if (selectedLength !== 0) {
						currentObject.showRemoveButton();
					} else {
						currentObject.hideRemoveButton();
					}
				});
				tableHead.append(thElementLocal);
				// Add Remove Button to delete the selected Items from the Table.
				var secondBody = currentObject.currentTable.tBodies[1];
				var rowElement = document.createElement('tr');
				var tdElement = document.createElement('td');
				tdElement.setAttribute('colspan', totalLength);
				rowElement.append(tdElement);
				var wrapperDiv = document.createElement('div');
				wrapperDiv.className = 'd-flex';
				var removeElementButton = document.createElement('button');
				removeElementButton.className='btn btn-danger';
				removeElementButton.type = 'button';
				removeElementButton.innerHTML = 'Remove Selection';
				wrapperDiv.append(removeElementButton);
				wrapperDiv.className='text-center';
				tdElement.append(wrapperDiv);
				removeElementButton.style.display = 'none';
				this.removeButtonReference = removeElementButton;
				secondBody.append(rowElement);
				this.removeButtonReference.addEventListener('click', this.removeSelectedItems);
			}
			for (var index = 0; index < totalLength; index ++) {
				var thElement = document.createElement('th');
				thElement.innerHTML = labels[index];
				thElement.header = labels[index].toLowerCase();
				thElement.addEventListener('click', this.arrangeRowsPerHeader);
				this.tableHeaders.push(thElement.header);
				// Append the TH Element after the THead.
				tableHead.append(thElement);
				console.log('The Element has been bound with an event ', thElement);
			}
		}
	}
	
	this.selectAllCheck = undefined;
	
	this.removeButtonReference = undefined;
	
	this.getAllCheckboxes = function(){
		return this.currentTable.querySelectorAll('tbody tr > td:first-child > input[type="checkbox"]');
	}
	
	this.setCurrentSelectedUsers = function(count){
		this.currentTable.caption.innerHTML = 'Selected Users are ' + count;
	}
	
	this.getAllSelectedCheckboxes = function(){
		return this.currentTable.querySelectorAll('tbody tr > td:first-child > input[type="checkbox"]:checked');
	}
	
	this.renderBodyInTheTable = function(data){
		if (data) {
			// Empty the current body.
			this.currentTable.tBodies[0].innerHTML = '';
			var totalLength = data.length;
			for (var index = 0; index < totalLength; index ++) {
					var tableRow = document.createElement('tr');
					var dataRow = data[index];
					this.data.push(dataRow);
					// Using the data row to compare the respective values.
					tableRow.data = dataRow;
					var headLength = this.tableHeaders.length;
					if (this.addCheckboxes) {
						var localTdElement = document.createElement('td');
						var checkBox = document.createElement('input');
						checkBox.type = 'checkbox';
						checkBox.name = 'checks';
						localTdElement.append(checkBox);
						// Bind an event to update Select All and the same Checkbox.
						var currentObject = this;
						checkBox.addEventListener('change', function(){
							if (!this.checked) {
								// As this checkbox has been deselected, select all checkbox make it de-selected.
								currentObject.selectAllCheck.checked = false;
							} else {
								currentObject.showRemoveButton();
							}
							// Update the User Count.
							var allCheckboxes = currentObject.getAllCheckboxes();
							var allCheckboxesSelected = currentObject.getAllSelectedCheckboxes();
							if (allCheckboxes.length === allCheckboxesSelected.length) {
								currentObject.selectAllCheck.checked = true;
							}
							currentObject.setCurrentSelectedUsers(allCheckboxesSelected.length);
						});
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
	
	// This method will set the data and will render all the elements within the same.
	this.setData = function(propData) {
		this.data = propData;
		this.renderBodyInTheTable(this.data);
	}
	
	this.hideRemoveButton = function() {
		this.removeButtonReference.style.display = 'none';
	}
	
	this.showRemoveButton = function() {
		this.removeButtonReference.style.display = 'block';
	}
	
	this.updateChecksCount = function(){
		this.setCurrentSelectedUsers(this.getAllSelectedCheckboxes().length);
	}
	
	var removeSelected = function() {
		var selectedItems = this.getAllSelectedCheckboxes();
		var lengthOfSelected = selectedItems.length;
		// Iterate over all the selected Checkboxes and delete the data items.
		for (var index = 0; index < lengthOfSelected; index ++) {
			var item = selectedItems[index];
			console.log('The Remove button has been clicked. ');
			// This is mostly compatible to all the browsers.
			item.parentElement.parentElement.remove();
		}
		this.updateChecksCount();
		this.hideRemoveButton();
		// As we are deleting the record, the select all should get unchecked.
		this.selectAllCheck.checked = false;
	}
	
	this.removeSelectedItems = removeSelected.bind(this);

	var getDataToCompare = function(headerValue){
		var tbody = this.currentTable.tBodies[0];
		var childElements = tbody.children;
		var childrenLength = childElements.length;
		var resultArray = [];
		for (var index = 0; index < childrenLength; index ++) {
			var item = childElements[index];
			resultArray.push({
				index: index,
				valueToCompare: item.data[headerValue],
				actualElement: item
			});
		}
		return resultArray;
	}
	
	this.getDataToCompare = getDataToCompare.bind(this);
	
	var arrangeRowsPerHeader = function(event){
		var targetProp = event.target.header;
		var resultArray = this.getDataToCompare(targetProp.toLowerCase());
		console.log('The Result Array is ', resultArray);
		resultArray.sort(function(first, second){return first.valueToCompare > second.valueToCompare})
		var totalLength = resultArray.length;
		var tableBody = this.currentTable.tBodies[0];
		for (var index = 0; index < totalLength; index ++) {
			var currentItem = resultArray[index];
			if (index !== currentItem.index) {
				tableBody.insertBefore(currentItem.actualElement, tableBody.children[index]);
			}
		}
	}

	this.arrangeRowsPerHeader = arrangeRowsPerHeader.bind(this);

	var localProperties = properties ? properties : {};
  // The Current Table pointer to point to the DOM element.
	this.currentTable = document.createElement('table');
	// The Class Name to add to the table.
	this.currentTable.className = localProperties.className;
	// PROP: To see if the current Table supports Select All functionality.
	this.addCheckboxes = localProperties.addCheckboxes;
	
	// Create Head and Body.
	this.currentTable.createTHead();
	// This is the body for the actual elements to render.
	this.currentTable.createTBody();
	
	// This is the body to render the Action Buttons in that.
	this.currentTable.createTBody();
	
	// The Caption to show the information.
	this.currentTable.createCaption();
	// This function call will add the initial headers to the table.
	this.tableHeaders = properties.headers ? properties.headers : ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
	this.addHeaders(this.tableHeaders);
	domElement.append(this.currentTable);
	
	// The Data that will be rendered to the table.
	this.data = [];
	
	// The MSISDNS which are meant to be excluded from the list.
	this.excludedMsisdn = [];
}
